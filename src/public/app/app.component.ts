import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  isCollapsed: boolean = true;

  public constructor() {

  }

  public showSubscribe(): boolean {
    if (window.location.pathname.includes('/buy/')) {
      return true;
    } else {
      return false;
    }
  }

  public toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
