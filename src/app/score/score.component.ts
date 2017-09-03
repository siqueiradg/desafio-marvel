
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})

export class ScoreComponent implements OnInit {

  name: string;
  score: string;
  url: string;

  constructor() { }

  ngOnInit() {
    this.name = localStorage.getItem('namePlayer');
    this.score = localStorage.getItem('finalScore');
    this.url = this.getUrl();
  }

  getUrl(): string {
    return window.location.href.toString();
  }
}
