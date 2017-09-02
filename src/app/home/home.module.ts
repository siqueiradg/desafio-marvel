
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { HomeRoutingModule } from './home.routing.module';


@NgModule({
  imports: [
    HttpModule,
    RouterModule,
    CommonModule,
    HomeRoutingModule
  ],
  exports: [],
  declarations: [HomeComponent],
  providers: [
    HomeService
  ],
})
export class HomeModule { }
