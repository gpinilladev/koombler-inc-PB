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
  urlGetStateListOne: string = '';
  urlSetAddNewState:string="";
  urlSetEditState:string="";

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
    this.urlGetStateList = 'estado/listarEstado';
    return this.http.get(this.utility.fnGetHost() + this.urlGetStateList,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetListState(): Observable<any> {
    // const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetStateListOne = 'estado/listarEstado';
    return this.http.get(this.utility.fnGetHost() + this.urlGetStateListOne,
      {
        observe: 'response',
        // headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetAddNewState(dataObject: any): Observable<any> {
    this.urlSetAddNewState = 'estado/registrarEstado';
    return this.http.post(this.utility.fnGetHost() + this.urlSetAddNewState, dataObject, 
    {
      observe: 'response',
      reportProgress: true,
    });
  }

  fnHttpSetEditState(dataObject: any): Observable<any> {
    this.urlSetEditState = 'estado/editarEstado/' ;
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditState, dataObject, 
    {
      observe: 'response',
      reportProgress: true,
    });
  }
}
