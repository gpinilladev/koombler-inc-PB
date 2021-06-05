import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';

  urlSignInUser: string = '';
  urlSignUpUser: string = '';

  constructor(
    public http: HttpClient, 
    private utility: UtilitiesService
  ) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpSignInUser(data_object): Observable<any> {
    this.urlSignInUser = 'usuario/login';
    return this.http.post(this.utility.fnGetHost() + this.urlSignInUser, data_object,
      {
        observe: 'response',
        reportProgress: true,
      });
  }

  fnHttpSignUpUser(data_object): Observable<any> {
    this.urlSignUpUser = 'usuario/registrarUsuario';
    return this.http.post(this.utility.fnGetHost() + this.urlSignUpUser, data_object,
      {
        observe: 'response',
        reportProgress: true,
      });
  }

}
