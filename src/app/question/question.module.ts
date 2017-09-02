
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { QuestionComponent } from './question.component';
import { QuestionService } from './question.service';
import { QuestionRoutingModule } from './question.routing.module';

@NgModule({
  imports: [
    HttpModule,
    RouterModule,
    CommonModule,
    QuestionRoutingModule
  ],
  exports: [],
  declarations: [QuestionComponent],
  providers: [
    QuestionService
  ],
})
export class QuestionModule { }
