import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HelloDBHelloColResource } from 'src/app/resources/HelloDB/HelloCol/HelloDBHelloColResource';
import { MatchResource } from 'src/app/resources/MatchResource';
import { SummonerResource } from 'src/app/summoner/SummonerResourcee';
import { ChampionResource } from 'src/app/champion/ChampionResource';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { gamesIds } from './../../../backend/src/staticData/gamesIds';
import { ChampionDataDTO } from 'src/app/champion/ChampionDataDTO';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('helloInput')
  helloInput: ElementRef;

  @ViewChild('matchInput')
  matchInput: ElementRef;

  @ViewChild('regionInput')
  regionInput: ElementRef;

  @ViewChild('summonerNameInput')
  summonerNameInput: ElementRef;

  @ViewChild('championName')
  championNameInput: ElementRef;

  @ViewChild('displayMatchChampionsInput')
  displayMatchChampionsInput: ElementRef;

  backendHelloWorld: string;

  championIcon: SafeResourceUrl;
  championIcons: Array<SafeResourceUrl>;
  defaultMachId = gamesIds[0];

  constructor(private _sanitizer: DomSanitizer,
              private helloDBHelloColResource: HelloDBHelloColResource,
              private matchResource: MatchResource,
              private summonerResource: SummonerResource,
              private championResource: ChampionResource) {
  }

  ngOnInit(): void {
    this.helloDBHelloColResource.getHelloWorld().subscribe(x => {
      this.backendHelloWorld = x;
    });
  }

  sendToHelloDBHelloCol(): void {
    const value: string = this.helloInput.nativeElement.value;
    this.helloDBHelloColResource.postValue(value).subscribe(x => {
    });
  }

  getMatch(): void {
    const matchId: string = this.matchInput.nativeElement.value;
    this.matchResource.getMatch(matchId).subscribe(match => {
      console.log('match', match);
    });
  }

  getSummonerByName() {
    const summonerName: string = this.summonerNameInput.nativeElement.value;
    const region: string = this.regionInput.nativeElement.value;
    this.summonerResource.getSummonerByName(summonerName, region).subscribe(player => {
      console.log('player', player);
    });
  }

  getSummonerByAccountId() {

  }

  getChampionIcon() {
    const championName = this.championNameInput.nativeElement.value;
    this.championResource.getChampionIcon(championName).subscribe(x => {
      console.log('champion icon res', x);
      this.championIcon = x;
    });
  }

  displayMatchChampions() {
    const matchId: string = this.displayMatchChampionsInput.nativeElement.value;
    this.championIcons = [];
    this.matchResource.getMatch(matchId).subscribe(match => {
      console.log('match', match);
      const matchChampionsKeys = match.participants.map(part => part.championId);
      console.log('matchChampionsKeys', matchChampionsKeys);
      matchChampionsKeys.forEach((key, index) => {
        this.championResource.getChampionDataByChampionKey(key)
            .pipe(
              map(championData => championData.name),
              switchMap((championName: string) => this.championResource.getChampionIcon(championName))
            )
            .subscribe(icon => {
              this.championIcons.push(icon);
              console.log('index!', index);
              console.log('icon!', icon);
            });
      });
    });
  }
}
