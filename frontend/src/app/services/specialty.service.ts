import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetSpecialtiesList: string = '';
  urlGetSpecialtiesAdmin: string = '';
  urlSetAddNewSpecialty: string = '';
  urlSetEditSpecialty: string = '';
  urlSetDeleteSpecialty: string = '';

  constructor(
    public http: HttpClient, 
    private utility: UtilitiesService
  ) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetSpecialtiesList(): Observable<any> {
    // const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetSpecialtiesList = 'especialidad';
    return this.http.get(this.utility.fnGetHost() + this.urlGetSpecialtiesList,
      {
        observe: 'response',
        // headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetSpecialtiesAdmin(token: string): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetSpecialtiesAdmin = 'especialidad/listarEspecialidadAdmin';
    return this.http.get(this.utility.fnGetHost() + this.urlGetSpecialtiesAdmin,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetAddNewSpecialty(dataObject: any): Observable<any> {
    this.urlSetAddNewSpecialty = 'especialidad/registrarEspecialidad';
    return this.http.post(this.utility.fnGetHost() + this.urlSetAddNewSpecialty, dataObject, 
    {
      observe: 'response',
      reportProgress: true,
    });
  }

  fnHttpSetEditSpecialty(dataObject: any, id: any): Observable<any> {
    this.urlSetEditSpecialty = 'especialidad/editarEspecialidad/' + id;
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditSpecialty, dataObject, 
    {
      observe: 'response',
      reportProgress: true,
    });
  }

  fnHttpSetDeleteSpecialty(dataObject: any, id: any): Observable<any> {
    this.urlSetDeleteSpecialty = 'especialidad/inactivarEspecialidad/' + id;
    return this.http.put(this.utility.fnGetHost() + this.urlSetDeleteSpecialty, dataObject, 
    {
      observe: 'response',
      reportProgress: true,
    });
  }

}
