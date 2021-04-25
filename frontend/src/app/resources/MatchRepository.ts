import { Injectable } from '@angular/core';
import { MatchResource } from 'src/app/resources/MatchResource';
import { map, switchMap, combineLatest, withLatestFrom } from 'rxjs/operators';
import { Observable, merge, forkJoin } from 'rxjs';
import { ChampionResource } from 'src/app/champion/ChampionResource';
import { MatchDTO } from 'src/app/match/MatchDTO';
import { ChampionDataDTO } from 'src/app/champion/ChampionDataDTO';
import { SafeResourceUrl } from '@angular/platform-browser';

@Injectable()
export class MatchRepository {

  constructor(private matchResource: MatchResource,
              private championResource: ChampionResource) {

  }

  getChampionsData(matchId: string): Observable<Array<ChampionDataDTO>> {
    return this.matchResource.getMatch(matchId)
               .pipe(
                 switchMap(
                   (match: MatchDTO) => {
                     const matchChampionsKeys: Array<string> = match.participants.map(part => part.championId);
                     const matchNamesPipes: Array<Observable<ChampionDataDTO>> = matchChampionsKeys.map(key => this.championResource.getChampionDataByChampionKey(key));
                     return forkJoin(matchNamesPipes);
                   })
               );
  }

  getChampionsName(matchId: string): Observable<Array<string>> {
    return this.getChampionsData(matchId)
               .pipe(
                 map((championsDatas: Array<ChampionDataDTO>) => championsDatas.map(championData => championData.name))
               );
  }

  getChampionsId(matchId: string): Observable<Array<string>> {
    return this.getChampionsData(matchId)
               .pipe(
                 map((championsDatas: Array<ChampionDataDTO>) => championsDatas.map(championData => championData.id))
               );
  }

  getChampionsIcons(matchId: string): Observable<Array<SafeResourceUrl>> {
    return this.getChampionsId(matchId)
               .pipe(
                 switchMap((championsNames: Array<string>) => {
                   const matchIconPipes = championsNames.map(championName => this.championResource.getChampionIcon(championName));
                   return forkJoin(matchIconPipes);
                 })
               );
  }


}
