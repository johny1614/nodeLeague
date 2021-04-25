import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { MatchResource } from 'src/app/resources/MatchResource';
import { ChampionResource } from 'src/app/champion/ChampionResource';
import { MatchRepository } from 'src/app/resources/MatchRepository';

@Component({
  selector: 'app-champions-displayer',
  templateUrl: './champions-displayer.component.html',
  styleUrls: ['./champions-displayer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChampionsDisplayerComponent implements OnInit {

  @Input()
  matchId: string;

  @Input()
  $forceUpdate: Subject<void>;

  championIcons: Array<SafeResourceUrl>;

  constructor(private matchResource: MatchResource,
              private championResource: ChampionResource,
              private matchRepository: MatchRepository,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.$forceUpdate.subscribe(() => {
      this.displayMatchChampions();
    });
  }

  displayMatchChampions(): void {
    this.championIcons = [];
    this.matchRepository.getChampionsIcons(this.matchId).subscribe(championIcons => {
      this.championIcons = championIcons;
      this.changeDetectorRef.detectChanges();
    });
  }


}
