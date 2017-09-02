
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})

export class ScoreComponent implements OnInit {

  name: string;
  score: number;

  constructor() { }

  ngOnInit() {
    this.name = localStorage.getItem('namePlayer');
    this.score = 9;
  }
}
