import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloDBHelloColResourceModule } from 'src/app/resources/HelloDB/HelloCol/HelloDBHelloColResourceModule';
import { MatchResource } from 'src/app/resources/MatchResource';
import { SummonerResource } from 'src/app/summoner/SummonerResourcee';
import { ChampionImageResource } from 'src/app/resources/ChampionImageResource';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HelloDBHelloColResourceModule
  ],
  providers: [MatchResource, SummonerResource, ChampionImageResource],
  bootstrap: [AppComponent]
})
export class AppModule {
}
