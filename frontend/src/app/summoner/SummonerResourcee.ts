import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SummonerResource {
  constructor(private http: HttpClient) {
  }

  getMatch(id: string): Observable<any> {
    return this.http.get(`/match/${id}`);
  }
}
