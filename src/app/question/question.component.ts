
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { QuestionService } from './question.service';
import { Character } from '../model/character';
import { Subscription } from 'rxjs/Subscription';


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

  regex = /\b[ ][(]\w+[ ]\w+[)]|[ ][(]\w+\b[)]/g;

  @ViewChild('nameCharacter') inputName: ElementRef;

  constructor(private service: QuestionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.points = 0;
    this.numberQuestion = 1;
    this.name = localStorage.getItem('namePlayer');
    this.currentPositionList = this.generateRandomPosition();
    this.getCharacter();
    this.loadDataQuestion();
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
      // Correção HTTP em HTTPS
      this.image = this.character.thumbnail.path.replace('http://', 'https://') + '.' + this.character.thumbnail.extension;
      // hack para quem não entende nada de quadrinhos
      console.log(this.character.name);
    }

  }

  getCharacter(): void {
    // OBTEM O DADO DO RESOLVER
    this.route.data.subscribe(
      (values) => {
        this.listCharacter = values[0]['data']['results'];
      }
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
    this.inputName.nativeElement.value = this.character.name.replace(this.regex, '');
  }

  answerQuestion(value: string): void {
    const nameApi = this.listCharacter[this.currentPositionList].name.toUpperCase();

    // Remove lixo do nome que esta entre ()
    const nameAux = nameApi.replace(this.regex, '');

    // GARANTE QUE A PERGUNTA NAO FOI RESPONDIDA
    if (this.checkAnswer()) {
      // COMPARA E REALIZA A SOMA E NOTIFICAÇÃO DOS PONTOS
      if (nameAux === value.toUpperCase()) {
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
