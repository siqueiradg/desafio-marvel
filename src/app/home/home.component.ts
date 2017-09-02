import { Component, EventEmitter } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private service: HomeService) {

  }

  saveName(name: string): void {
    this.service.saveName(name);
  }

}
