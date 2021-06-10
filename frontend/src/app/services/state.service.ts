import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';

  urlGetStateList: string = '';

  constructor(
    public http: HttpClient, 
    private utility: UtilitiesService
  ) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetStateList(token: string): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetStateList = 'estado';
    return this.http.get(this.utility.fnGetHost() + this.urlGetStateList,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }
}
