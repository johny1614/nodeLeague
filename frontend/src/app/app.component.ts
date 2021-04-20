import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HelloDBHelloColResource } from 'src/app/resources/HelloDB/HelloCol/HelloDBHelloColResource';
import { MatchResource } from 'src/app/resources/MatchResource';
import { SummonerResource } from 'src/app/summoner/SummonerResourcee';
import { ChampionImageResource } from 'src/app/resources/ChampionImageResource';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

  backendHelloWorld: string;

  championIcon: SafeResourceUrl;

  constructor(private _sanitizer: DomSanitizer,
              private helloDBHelloColResource: HelloDBHelloColResource,
              private matchResource: MatchResource,
              private summonerResource: SummonerResource,
              private championImageResource: ChampionImageResource) {
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
    this.championImageResource.getChampionIcon(championName).subscribe(x => {
      console.log('champion icon res', x);
      this.championIcon = x;
    });
  }
}
