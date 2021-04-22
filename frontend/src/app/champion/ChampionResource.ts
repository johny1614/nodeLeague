import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChampionDataDTO } from 'src/app/champion/ChampionDataDTO';

@Injectable()
export class ChampionResource {
  constructor(private http: HttpClient) {
  }

  getChampionIcon(championName: string): Observable<any> {
    return this.http.get(`/champions/icon/${championName}`, { responseType: 'blob' }).pipe(switchMap(response => {
      return this.createImageFromBlob(response);
    }));
  }

  getChampionDataByChampionName(championName: string): Observable<ChampionDataDTO> {
    // TODO class-transformer
    // @ts-ignore
    return this.http.get(`/champions/by-name/${championName}`);
  }

  getChampionDataByChampionKey(championKey: string): Observable<ChampionDataDTO> {
    // TODO class-transformer
    // @ts-ignore
    return this.http.get(`/champions/by-key/${championKey}`);
  }

  private createImageFromBlob(image: Blob): Subject<any> {
    let reader = new FileReader();
    const imageToShowSubject = new Subject();
    reader.addEventListener('load', () => {
      const imageToShow = reader.result;
      imageToShowSubject.next(imageToShow);
      imageToShowSubject.complete();
    }, false);
    reader.readAsDataURL(image);
    return imageToShowSubject;
  }

}
