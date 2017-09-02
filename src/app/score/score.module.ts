
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ScoreComponent } from './score.component';
import { ScoreRoutingModule } from './score.routing.module';

@NgModule({
  imports: [
    HttpModule,
    RouterModule,
    CommonModule,
    ScoreRoutingModule
  ],
  exports: [],
  declarations: [ScoreComponent],
  providers: [],
})
export class ScoreModule { }
