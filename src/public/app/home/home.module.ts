import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    AngularSvgIconModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
