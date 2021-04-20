import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class ChampionImageResource {
  constructor(private http: HttpClient) {
  }

  getChampionIcon(championName: string): Observable<any> {
    return this.http.get(`/champions/icon/${championName}`, { responseType: 'blob' }).pipe(switchMap(response => {
      return this.createImageFromBlob(response);
    }));
  }

  createImageFromBlob(image: Blob): Subject<any> {
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
