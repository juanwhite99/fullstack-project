import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Character, Episode, DataResponse } from '../interfaces/data.interface';

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

  constructor(private apollo: Apollo) {
    this.getDataAPI();
  }

  private getDataAPI(): void {
    this.apollo.watchQuery<DataResponse>({
      query: QUERY
    }).valueChanges.pipe(
      take(1),
      tap(({data}) => {
        const {characters, episodes} = data;
        console.log(data);
        this.episodeSubject.next(episodes.results);
        this.characterSubject.next(characters.results);
      })
    ).subscribe();
  }
}
