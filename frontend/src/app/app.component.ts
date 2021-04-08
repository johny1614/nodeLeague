import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HelloDBHelloColResource } from 'src/app/resources/HelloDB/HelloCol/HelloDBHelloColResource';
import { MatchResource } from 'src/app/resources/MatchResource';

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

  backendHelloWorld: string;

  constructor(private helloDBHelloColResource: HelloDBHelloColResource,
              private matchResource: MatchResource) {
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
}
