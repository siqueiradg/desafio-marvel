import { Component, EventEmitter } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private service: AppService) {

  }

  saveName(name: string): void {
    this.service.saveName(name);
  }

}
