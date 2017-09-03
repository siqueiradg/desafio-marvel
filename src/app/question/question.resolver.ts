import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { QuestionService } from './question.service';

@Injectable()
export class QuestionResolver implements Resolve<any> {

    constructor(private service: QuestionService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {
            return this.service.getCharacters();
        }
}
