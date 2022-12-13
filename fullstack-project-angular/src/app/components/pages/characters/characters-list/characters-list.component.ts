import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { DataService } from '@app/shared/services/data.service';
import { LocalStorageService } from '@shared/services/local-storage.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent {
  characters$ = this.dataSVC.characters$;
  showButton = false;
  private scrollHeight = 500;


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private dataSVC: DataService,
    private localStorage: LocalStorageService) { }

  @HostListener('window:scroll')
  onWindowsScroll(): void {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet || scrollTop) > this.scrollHeight;
  }

  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }
}
