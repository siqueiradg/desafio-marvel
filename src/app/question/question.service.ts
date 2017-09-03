
import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class QuestionService {

  private keyPrivate = '687358cd666e276508c340010cd381d5fa777c37';
  private keyPublic = 'ced486b507201aa995f105b06eaa6235';
  private time = new Date();

  constructor() {}


  public getCharacters(): void {
    const timestamp = this.time.getTime();
    const hash = Md5.hashStr(timestamp + this.keyPrivate + this.keyPublic);

    const urlApi = 'https://gateway.marvel.com:443/v1/public/characters?limit=50&apikey=' + this.keyPublic + '&ts=' + timestamp + '&hash=' + hash;

    console.log(urlApi);

  }
}
