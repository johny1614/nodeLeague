import { Injectable } from '@angular/core';
import { MatchResource } from 'src/app/resources/MatchResource';

@Injectable()
export class MatchRepository {

  constructor(private matchResource: MatchResource) {

  }

}
