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
  urlSetEditUser: string = '';
  urlSetEditInactiveUser: string = '';


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

  fnHttpSetEditUser(dataObject: any, id: any): Observable<any> {
    this.urlSetEditUser = 'usuario/editarUsuario/' + id;
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditUser, dataObject, 
    {
      observe: 'response',
      reportProgress: true,
    });
  }

  fnHttpSetEditInactivarUser(dataObject: any, id: any): Observable<any> {
    dataObject["idEstado"] = "60b726090ad7c316b5d7a977";
    this.urlSetEditInactiveUser = 'usuario/cambiarEstadoUsuario';
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditInactiveUser, dataObject, 
    {
      observe: 'response',
      reportProgress: true,
    });
  }

}
