import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {

  isCollapsed: boolean = true;

  showCrisis: boolean = true;

  public constructor() { }

  public dismissCrisis(): void {
    this.showCrisis = false;
  }

  public showSubscribe(): boolean {
    return window.location.pathname.includes('/buy');
  }

  public toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
