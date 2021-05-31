import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Video } from '../models/video';
import { DataMock } from '../models/data-mock';

@Injectable({
  providedIn: 'root'
})
export class CountryDataService {

  private endPointCountryData = '../../assets/videos/videos.json';
  private endPointDataMock = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) { }

  fnHttpGetDataCountry(): Observable<Video[]> {
    return this.http.get<Video[]>(this.endPointCountryData);
  }

  fnHttpGetDataMock(id: string): Observable<DataMock> {
    return this.http.get<DataMock>(`${ this.endPointDataMock }/${ id }`);
  }

}
