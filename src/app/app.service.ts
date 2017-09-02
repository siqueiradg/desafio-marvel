
import { Injectable } from '@angular/core';

declare var Materialize: any;

@Injectable()
export class AppService {
  constructor() { }

  saveName(name: string): void {
    if (name === '' || name === undefined) {
      Materialize.toast('You need to enter your name!', 2000);
    }else {
      localStorage.setItem('namePlayer', name);
    }
  }
}
