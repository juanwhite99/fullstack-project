import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '@shared/interfaces/data.interface';
import { ToastrService } from 'ngx-toastr';

const MY_FAVORITES = 'myFavorites';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private charactersFavSubject = new BehaviorSubject<Character[]>([]);
  charactersFav$ = this.charactersFavSubject.asObservable();

  constructor(private toastrSvc: ToastrService) {
    this.initialStorage();
  }

  addOrRemoveFavorite(character: Character) {
    const {id} = character;
    const currentsFav = this.getFavoriteCharacters();
    const found = !!currentsFav.find((fav: Character) => fav.id === id);
    found ? this.removeFromFavorite(id) : this.addToFavorite(character);
  }

  getFavoriteCharacters(): any {
    try{
      const charactersFav = JSON.parse(localStorage.getItem(MY_FAVORITES) || '[]');
      this.charactersFavSubject.next(charactersFav);
      return charactersFav;
    }
    catch(error) {
      console.error(error);
    }
  }

  clearStorage(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(error);
      this.toastrSvc.error(`Error clearing the storage: ${error}`, 'RickAndMortyApp');
    }
  }

  private initialStorage(): void {
    const currents: any[] = JSON.parse(
      localStorage.getItem(MY_FAVORITES) || '[]'
    );
    if (currents.length === 0) {
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    }
    this.getFavoriteCharacters();
  }

  private addToFavorite(character: Character): void {
    try {
      const currentsFav = this.getFavoriteCharacters();
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...currentsFav, character]));
      this.charactersFavSubject.next([...currentsFav, character]);
      this.toastrSvc.success(`${character.name} added to favorites`, 'RickAndMortyApp');
    } catch (error) {
      console.error(error);
      this.toastrSvc.error(`Error adding to favorites: ${error}`, 'RickAndMortyApp');
    }
  }

  private removeFromFavorite(id: number): void {
    try {
      const currentsFav = this.getFavoriteCharacters();
      const characters = currentsFav.filter((item: Character) => item.id !== id);
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...characters]));
      this.charactersFavSubject.next([...characters]);
      this.toastrSvc.warning(`Character removed from favorites`, 'RickAndMortyApp');
    } catch (error) {
      console.error(error);
      this.toastrSvc.error(`Error removing from favorites: ${error}`, 'RickAndMortyApp');
    }
  }

}
