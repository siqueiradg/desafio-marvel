
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  answer: boolean;

  listCharacter: Character[];
  character: Character;
  currentPositionList: number;
  image: string;

  @ViewChild('nameCharacter') inputName: ElementRef;

  constructor(private service: QuestionService, private router: Router) { }

  ngOnInit() {
    this.points = 0;
    this.numberQuestion = 1;
    this.name = localStorage.getItem('namePlayer');
    this.currentPositionList = this.generateRandomPosition();
    this.getCharacter();
  }

  generateRandomPosition(): number {
    // GERA UM NUMERO RANDOMICO PARA O SISTEMA NÃO FICAR TEDIOSO
    const number = Math.floor(Math.random() * 30);
    return number;
  }

  loadDataQuestion(): void {
    // CARREGA DADOS DO HEROI, CASO O MESMO NÃO TENHA IMAGEM PULA PARA O PROXIMO
    this.character = this.listCharacter[this.currentPositionList];
    if (this.character.thumbnail.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
      this.currentPositionList++;
      this.loadDataQuestion();
    }else {
      this.image = this.character.thumbnail.path + '.' + this.character.thumbnail.extension;
      console.log(this.character.name); // LOG IMPORTANTE PARA QUEM NÃO CONHECE QUADRINHOS *EU
    }

  }

  getCharacter(): void {
    this.service.getCharacters().subscribe(
      (values) => {
        this.listCharacter = values['data']['results'];
      },
      error => console.log('Erro:', error),
      () => this.loadDataQuestion()
    );
  }

  addPoints(): void {
    this.points++;
  }

  subPoints(): void {
    this.points--;
  }

  nextQuestion(): void {
    if (this.answer) {
      this.answer = false;
      if (this.numberQuestion < 10) {
        this.numberQuestion++;
        this.currentPositionList++;
        this.loadDataQuestion();
      }else {
        localStorage.setItem('finalScore', '' + this.points);
        this.router.navigateByUrl('/score');
      }
    }else {
      this.service.notify('answer the question!');
    }
  }

  useTip(): void {
    this.tip = true;
    this.inputName.nativeElement.value = this.character.name;
  }

  answerQuestion(value: string): void {
    const nameApi = this.listCharacter[this.currentPositionList].name.toUpperCase();
    // GARANTE QUE A PERGUNTA NAO FOI RESPONDIDA
    if (this.checkAnswer()) {
      // COMPARA E REALIZA A SOMA E NOTIFICAÇÃO DOS PONTOS
      if (nameApi === value.toUpperCase()) {
        if (!this.tip) {
          this.addPoints();
          this.service.notify('Congratulations! +1');
        }else {
          this.tip = false;
          this.service.notify('ok, nothing!');
        }
        this.answer = true;
      }else {
        // AVISA SE ESTIVER VAZIO A RESPOSTA
        if (value.length <= 0) {
          this.service.notify('ops, answer is empty!');
        }else {
          this.subPoints();
          this.service.notify('Wrong! -1');
          this.answer = true;
        }
      }
    }
    // LIMPA O CAMPO DE RESPOSTA
    this.inputName.nativeElement.value = '';
  }

  checkAnswer(): boolean {
    // VERIFICA SE A PERGUNTA JA FOI RESPONDIDA
    if (this.answer) {
      this.service.notify('already answered!');
      return false;
    }
    return true;
  }
}
