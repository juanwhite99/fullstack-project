import { Component } from '@angular/core';
import { DataService } from '@app/shared/services/data.service';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent {
  characters$ = this.dataSVC.characters$;
  constructor(private dataSVC: DataService, private localStorage: LocalStorageService) { }

}
