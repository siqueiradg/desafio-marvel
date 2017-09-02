import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home',
  loadChildren: 'app/home/home.module#HomeModule',
  },
  { path: 'question',
    loadChildren: 'app/question/question.module#QuestionModule',
  }
  // { path: 'score',
  //   loadChildren: 'app/score/score.module#ScoreModule',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
