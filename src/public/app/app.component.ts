import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {

  isCollapsed: boolean = true;

  public constructor() { }

  public showSubscribe(): boolean {
    return window.location.pathname.includes('/buy');
  }

  public toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
