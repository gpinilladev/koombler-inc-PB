import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSpecialityService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';

  urlSignInUser: string = '';
  urlCreateSpecialityByUser: string = '';
  urlGetListUserSpeciality: string = '';
  urlSetAddNewUserSpeciality: string = '';

  constructor(
    public http: HttpClient, 
    private utility: UtilitiesService
  ) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpCreateSpecialityByUser(data_object): Observable<any> {
    this.urlCreateSpecialityByUser = 'usuarioEspecialidad/crearUsuarioEspecialidad';
    return this.http.post(this.utility.fnGetHost() + this.urlCreateSpecialityByUser, data_object,
      {
        observe: 'response',
        reportProgress: true,
      });
  }

  fnHttpGetListUserSpecialityAdmin(token: string): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetListUserSpeciality = 'usuarioEspecialidad';
    // console.log('paso por aca 20' + this.utility.fnGetHost() + this.urlGetListUserSpeciality)
    return this.http.get(this.utility.fnGetHost() + this.urlGetListUserSpeciality,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetListUserSpeciality(): Observable<any> {
    this.urlGetListUserSpeciality = 'usuarioEspecialidad';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListUserSpeciality,
      {
        observe: 'response',
        reportProgress: true,
      });
  }
  fnHttpSetAddNewuserSpecialist(dataObject: any): Observable<any> {
    this.urlSetAddNewUserSpeciality = 'usuarioEspecialidad/crearUsuarioEspecialidad';
    return this.http.post(this.utility.fnGetHost() + this.urlSetAddNewUserSpeciality, dataObject,
      {
        observe: 'response',
        reportProgress: true,
      });
  }
}
