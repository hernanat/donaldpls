import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Speech } from '../models/speech';

@Injectable()
export class GeneratorService {
  private generatorUrl: string = 'http://localhost:5000/api/Generator/15';
  constructor(private http: Http) { }

  getSpeech(){
    return this.http.get(this.generatorUrl).map(r => r.json());
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
