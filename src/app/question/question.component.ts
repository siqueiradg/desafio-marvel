
import { Component, OnInit } from '@angular/core';

import { QuestionService } from './question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {

  name: string;
  points: number;
  numberQuestion: number;

  constructor(private service: QuestionService) { }

  ngOnInit() {
    this.points = 50;
    this.numberQuestion = 1;
    this.name = localStorage.getItem('namePlayer');

    this.service.getCharacters();
  }
}
