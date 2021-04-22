import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloDBHelloColResourceModule } from 'src/app/resources/HelloDB/HelloCol/HelloDBHelloColResourceModule';
import { MatchResource } from 'src/app/resources/MatchResource';
import { SummonerResource } from 'src/app/summoner/SummonerResourcee';
import { ChampionResource } from 'src/app/champion/ChampionResource';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HelloDBHelloColResourceModule
  ],
  providers: [MatchResource, SummonerResource, ChampionResource],
  bootstrap: [AppComponent]
})
export class AppModule {
}
