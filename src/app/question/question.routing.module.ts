
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionComponent } from './question.component';
import { QuestionResolver } from './question.resolver';

const routes: Routes = [
  { path: '', component: QuestionComponent, resolve: [QuestionResolver]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionRoutingModule {}
