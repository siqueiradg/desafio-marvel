import { Component, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  load: boolean;

  @ViewChild('startGame') startGame: ElementRef;

  constructor(private service: HomeService) {

  }

  saveName(name: string): void {
    // hack -> carregando
    if (name.length > 0) {
      this.startGame.nativeElement.text = 'Loading...';
      this.load = true;
    }
    this.service.saveName(name);
  }

}
