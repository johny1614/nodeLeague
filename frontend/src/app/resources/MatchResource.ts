import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatchDTO } from 'src/app/match/MatchDTO';

@Injectable()
export class MatchResource {
  constructor(private http: HttpClient) {
  }

  getMatch(id: string): Observable<MatchDTO> {
    // @ts-ignore // TODO use class-validator and class-transformer
    return this.http.get(`/match/${id}`);
  }

  getSummonerMatches(summonerNameMatches: string, server = 'EUN1'): Observable<any> {
    console.log('summonerNameMatches', summonerNameMatches);
    const options = { headers: { server } };
    return this.http.get(`/matches/by-summoner-name/${summonerNameMatches}`, options);
  }
}
