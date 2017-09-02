
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

declare var Materialize: any;

@Injectable()
export class HomeService {
  constructor(private router: Router) { }

  saveName(name: string): void {
    if (name === '' || name === undefined) {
      Materialize.toast('You need to enter your name!', 2000);
    }else {
      localStorage.setItem('namePlayer', name);
      this.router.navigateByUrl('/question');
    }
  }
}
