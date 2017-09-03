
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Md5 } from 'ts-md5/dist/md5';

declare var Materialize: any;

@Injectable()
export class QuestionService {

  private keyPrivate = '687358cd666e276508c340010cd381d5fa777c37';
  private keyPublic = 'ced486b507201aa995f105b06eaa6235';
  private time = new Date();

  constructor(private http: Http) {}

  public getCharacters(): Observable<any[]> {
    const timestamp = this.time.getTime();
    const hash = Md5.hashStr(timestamp + this.keyPrivate + this.keyPublic);

    const urlApi = 'https://gateway.marvel.com:443/v1/public/characters?orderBy=-modified&limit=45&apikey=' + this.keyPublic + '&ts=' + timestamp + '&hash=' + hash;

    return this.http.get(urlApi).map(
      res => res.json()
    );

  }

  public notify(value: string): void {
    Materialize.toast(value, 2000);
  }
}
