import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AboutUsModule } from './about-us/about-us.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuyModule } from './buy/buy.module';
import { FaqModule } from './faq/faq.module';
import { HomeModule } from './home/home.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { TrainingComponent } from './training/training.component';


@NgModule({
  imports: [
    HttpClientModule,      // (Required) for share counts
    // HttpClientJsonpModule, // (Optional) For Tumblr counts
    ShareButtonsModule.forRoot(),
    AngularFontAwesomeModule,
    BrowserModule,
    FormsModule,
    HomeModule,
    NgbModule.forRoot(),
    BuyModule,
    PharmacyModule,
    AboutUsModule,
    ReactiveFormsModule,
    FaqModule,
    FormsModule,
    AppRoutingModule, // this must be LAST so that other routes take president.
  ],
  declarations: [
    AppComponent,
    TrainingComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
