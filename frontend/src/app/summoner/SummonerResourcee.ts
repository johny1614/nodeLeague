import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class SummonerResource {
  constructor(private http: HttpClient) {
  }

  getSummonerByName(name: string, region: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ region });
    return this.http.get(`/summoners/by-name/${name}`, { headers });
  }

}
