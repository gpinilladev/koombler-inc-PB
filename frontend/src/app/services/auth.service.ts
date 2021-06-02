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

  // fnHttpSignUpUser(): Observable<any> {
  //   // const headers = this.fnSetDefineTokenAuthorization(guid_user);
  //   this.urlSignInUser = 'usuario/registrarUsuario';
  //   return this.http.get(this.utility.fnGetHost() + this.urlSignInUser,
  //     {
  //       observe: 'response',
  //       // headers: headers,
  //       reportProgress: true,
  //     });
  // }

  fnHttpSignUpUser(data_object): Observable<any> {
    console.log('data_object: ', data_object);
    // const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSignUpUser = 'usuario/registrarUsuario';
    return this.http.post(this.utility.fnGetHost() + this.urlSignUpUser, data_object,
      {
        observe: 'response',
        reportProgress: true,
      });
  }

}
