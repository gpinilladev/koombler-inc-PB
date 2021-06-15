import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetSlicitudesList: string = '';
  urlSetAddNewSolicitud: string = '';
  urlSetEditSolicitud: string = '';
  urlSetDeleteSolicitud: string = '';

  constructor(
    public http: HttpClient, 
    private utility: UtilitiesService
  ) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetSolicitudesList(): Observable<any> {
    //const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetSlicitudesList = 'solicitud/listarSolicitud';
    return this.http.get(this.utility.fnGetHost() + this.urlGetSlicitudesList,
      {
        observe: 'response',
        reportProgress: true,
      });
  }

  fnHttpSetAddNewSolicitud(dataObject: any, idUser: string): Observable<any> {
    dataObject.idUsuario = idUser;
    this.urlSetAddNewSolicitud = 'solicitud/registrarSolicitud';
    return this.http.post(this.utility.fnGetHost() + this.urlSetAddNewSolicitud, dataObject,
    {
      observe: 'response',
      reportProgress: true,
    });
  }
  

  fnHttpSetEditSolicitud(dataObject: any, id: any): Observable<any> {
    this.urlSetEditSolicitud = 'solicitud/editarSolicitud/' + id;
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditSolicitud, dataObject,
    {
      observe: 'response',
      reportProgress: true,
    });
  }

  fnHttpSetDeleteSolicitud(dataObject: any, id: any): Observable<any> {
    this.urlSetDeleteSolicitud = 'solicitud/inactivarSolicitud/' + id;
    return this.http.put(this.utility.fnGetHost() + this.urlSetDeleteSolicitud, dataObject,
    {
      observe: 'response',
      reportProgress: true,
    });
  }
}
