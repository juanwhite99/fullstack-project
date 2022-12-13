import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Character } from '@app/shared/interfaces/data.interface';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersCardComponent {
  @Input() character!: Character;

  constructor(private localStorageSvc: LocalStorageService){ }

  toggleFavorite(id: number): void {
    const isFavorite = this.character.isFavorite;
    this.character.isFavorite = !isFavorite;
    this.getIcon();
    this.localStorageSvc.addOrRemoveFavorite(this.character);
  }

  getIcon(): string {
    return this.character.isFavorite ? 'fav-icon-filled' : 'fav-icon-outlined';
  }

}
