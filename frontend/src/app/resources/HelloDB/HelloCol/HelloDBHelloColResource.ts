import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HelloDBHelloColResource {
  constructor(private http: HttpClient) {
  }

  postValue(value: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('input', value);
    return this.http.post('/hello', {}, { headers });
  }

  getHelloWorld(): Observable<string> {
    return this.http.get('/helloworld').pipe(map(res => res['text']));
  }
}
