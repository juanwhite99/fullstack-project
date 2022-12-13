import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map, pluck, take, tap, withLatestFrom } from 'rxjs';
import { Character, Episode, DataResponse } from '../interfaces/data.interface';
import { LocalStorageService } from './local-storage.service';

const QUERY = gql`{
  episodes {
    results {
      name
      episode
    }
  }

  characters {
    results {
      id
      name
      status
      species
      gender
      image
    }
  }
}`;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private episodeSubject = new BehaviorSubject<Episode[]>([]);
  episodes$ = this.episodeSubject.asObservable();

  private characterSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.characterSubject.asObservable();

  constructor(private apollo: Apollo, private localStorageSvc: LocalStorageService) {
    this.getDataAPI();
  }

  getCharactersByPage(pageNumber: number): void {
    const QUERY_BY_PAGE = gql`{
      characters(page: ${pageNumber}) {
        results {
          id
          name
          status
          species
          gender
          image
        }
      }
    }`;

    this.apollo.watchQuery<any>({
      query: QUERY_BY_PAGE
    }).valueChanges.pipe(
      take(1),
      // pluck('data','characters'),
      map(r => r?.data?.characters),
      withLatestFrom(this.characters$),
      tap(([apiResponse, characters]) => {
        this.parseCharactersData([...characters, ...apiResponse.results]);
      })
    ).subscribe();
  }

  private getDataAPI(): void {
    this.apollo.watchQuery<DataResponse>({
      query: QUERY
    }).valueChanges.pipe(
      take(1),
      tap(({data}) => {
        const {characters, episodes} = data;
        this.episodeSubject.next(episodes.results);
        this.parseCharactersData(characters.results);
      })
    ).subscribe();
  }

  private parseCharactersData(characters: Character[]): void {
    const currentFavs = this.localStorageSvc.getFavoriteCharacters();
    const newData = characters.map(character => {
      const found = !!currentFavs.find((fav: Character) => fav.id === character.id);
      return {...character, isFavorite: found};
    });
    this.characterSubject.next(newData);
  }


}
