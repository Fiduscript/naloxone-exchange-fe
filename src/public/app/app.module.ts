import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { HttpClientModule } from '@angular/common/http';
import { ShareButtonModule } from '@ngx-share/button';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { AboutUsModule } from './about-us/about-us.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FaqModule } from './faq/faq.module';
import { HomeModule } from './home/home.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { ProductsModule } from './products/products.module';
import { TrainingComponent } from './training/training.component';
import { UpdateSubscriberComponent } from './update-subscriber/update-subscriber.component';

@NgModule({
  imports: [
    HttpClientModule,      // (Required) for share counts
    // HttpClientJsonpModule, // (Optional) For Tumblr counts
    ShareButtonModule.forRoot(),
    ShareButtonsModule.forRoot(),
    AngularFontAwesomeModule,
    BrowserModule,
    FormsModule,
    HomeModule,
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
    TrainingComponent,
    UpdateSubscriberComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
