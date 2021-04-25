import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloDBHelloColResourceModule } from 'src/app/resources/HelloDB/HelloCol/HelloDBHelloColResourceModule';
import { MatchResource } from 'src/app/resources/MatchResource';
import { SummonerResource } from 'src/app/summoner/SummonerResourcee';
import { ChampionResource } from 'src/app/champion/ChampionResource';
import { ChampionsDisplayerComponent } from './champion/champions-displayer/champions-displayer.component';
import { FormsModule } from '@angular/forms';
import { MatchRepository } from 'src/app/resources/MatchRepository';

@NgModule({
  declarations: [
    AppComponent,
    ChampionsDisplayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HelloDBHelloColResourceModule,
    FormsModule
  ],
  providers: [MatchResource, SummonerResource, ChampionResource, MatchRepository],
  bootstrap: [AppComponent]
})
export class AppModule {
}
