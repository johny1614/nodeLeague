import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HelloDBHelloColResource } from 'src/app/resources/HelloDB/HelloCol/HelloDBHelloColResource';
import { MatchResource } from 'src/app/resources/MatchResource';
import { SummonerResource } from 'src/app/summoner/SummonerResourcee';
import { ChampionResource } from 'src/app/champion/ChampionResource';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { gamesIds } from './../../../backend/src/staticData/gamesIds';
import { Subject } from 'rxjs';


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
  matchId = gamesIds[0];
  $championIconsForceUpdate = new Subject();
  summonerNameMatches = 'johny1614';
  defaultAccountId = 'fpQGRdfEVNMKR_9RzlbAkmfiMHV79Yltob0Q97dNXvASIg'; // to jest uzywane
  puuid = '5OIrWw5vyjwA6_QgOQotFoI7hmN76wA5WURwE9FDe0VACcPehH45f42pod1N1qXXkGDMaKIOMeKJcQ';

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
    this.matchResource.getMatch(this.matchId).subscribe(match => {
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
      this.championIcon = x;
    });
  }

  displayMatchChampions() {
    this.$championIconsForceUpdate.next();
  }

  getSummonerMatches() {
    this.matchResource.getSummonerMatches(this.summonerNameMatches).subscribe(x => {
      console.log('x', x);
    });
  }
}
