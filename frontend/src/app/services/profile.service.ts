import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';

  urlGetProfilesList: string = '';

  constructor(
    public http: HttpClient, 
    private utility: UtilitiesService
  ) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetProfilesList(): Observable<any> {
    // const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetProfilesList = '/perfil/listaPerfiles';
    return this.http.get(this.utility.fnGetHost() + this.urlGetProfilesList,
      {
        observe: 'response',
        // headers: headers,
        reportProgress: true,
      });
  }
}
