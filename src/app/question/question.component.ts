
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuestionService } from './question.service';
import { Character } from '../model/character';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {

  name: string;
  points: number;
  numberQuestion: number;
  tip: boolean;

  listCharacter: Character[];
  currentPositionList: number;

  constructor(private service: QuestionService, private router: Router) { }

  ngOnInit() {
    this.points = 0;
    this.numberQuestion = 1;
    this.name = localStorage.getItem('namePlayer');
    this.currentPositionList = this.generateRandomPosition();
  }

  generateRandomPosition(): number {
    const number = Math.floor(Math.random() * 30);
    return number;
  }


  getCharacter(): void {

  }

  addPoints(): void {
    this.points++;
  }

  subPoints(): void {
    this.points--;
  }

  nextQuestion(): void {
    if (this.numberQuestion < 10) {
      this.numberQuestion++;
      this.currentPositionList++;
    }else {
      localStorage.setItem('finalScore', '' + this.points);
      this.router.navigateByUrl('/score');
    }
  }

  useTip(): void {
    this.tip = true;
  }

  answerQuestion(value: string): void {
    const nameApi = this.listCharacter[this.currentPositionList].name.toUpperCase();

    if (nameApi === value.toUpperCase()) {
      if (!this.tip) {
        this.addPoints();
        this.nextQuestion();
      }else {
        this.tip = false;
        this.nextQuestion();
      }
    }else {
      this.subPoints();
    }
  }
}
