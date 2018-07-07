import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsModule } from './products/products.module';
import { UpdateSubscriberComponent } from './update-subscriber/update-subscriber.component';

@NgModule({
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    ProductsModule,
    ReactiveFormsModule,
    AppRoutingModule, // this must be LAST so that other routes take president.
  ],
  declarations: [
    AboutComponent,
    AppComponent,
    HomeComponent,
    UpdateSubscriberComponent,
  ],
  providers: [],
  bootstrap: [AppComponent, UpdateSubscriberComponent]
})
export class AppModule { }
