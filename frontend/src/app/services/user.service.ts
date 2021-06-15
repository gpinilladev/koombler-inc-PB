import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetListUser:string = "";

  constructor(
    public http: HttpClient,
    private utility: UtilitiesService
  ) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetListUserAdmin(token: string): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetListUser = 'usuario/listarUsuario';
    console.log(this.utility.fnGetHost() + this.urlGetListUser)
    return this.http.get(this.utility.fnGetHost() + this.urlGetListUser,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetListUser(): Observable<any> {
    this.urlGetListUser = 'usuario/listarUsuario';
    console.log(this.utility.fnGetHost() + this.urlGetListUser)
    return this.http.get(this.utility.fnGetHost() + this.urlGetListUser,
      {
        observe: 'response',
        reportProgress: true,
      });
  }

}