import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AboutUsModule } from './about-us/about-us.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FaqModule } from './faq/faq.module';
import { HomeComponent } from './home/home.component';
import { OverdoseComponent } from './overdose/overdose.component';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { ProductsModule } from './products/products.module';
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
    FaqModule,
    FormsModule,
    AppRoutingModule, // this must be LAST so that other routes take president.
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    OverdoseComponent,
    UpdateSubscriberComponent
  ],
  providers: [],
  bootstrap: [AppComponent, UpdateSubscriberComponent]
})
export class AppModule { }
