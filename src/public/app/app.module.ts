import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import {OverdoseComponent} from './overdose/overdose.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ProductsModule } from './products/products.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { AboutUsModule } from './about-us/about-us.module';
import { UpdateSubscriberComponent } from './update-subscriber/update-subscriber.component';

@NgModule({
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    ProductsModule,
    PharmacyModule,
    AboutUsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule, // this must be LAST so that other routes take president.
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    OverdoseComponent,
    UpdateSubscriberComponent
  ],
  providers: [],
  bootstrap: [AppComponent, UpdateSubscriberComponent]
})
export class AppModule { }
