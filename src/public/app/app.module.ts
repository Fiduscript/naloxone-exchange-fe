import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsModule } from './products/products.module';
import {AboutComponent} from './about/about.component';
import { OverdoseComponent } from './overdose/overdose.component';

@NgModule({
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    NgbModule.forRoot(),
    ProductsModule,
    AppRoutingModule, // this must be LAST so that other routes take president.
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    OverdoseComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
