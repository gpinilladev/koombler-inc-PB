import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoSolicitudService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlSetAddNewEstadoSolicitud: string = '';

  constructor(
    public http: HttpClient, 
    private utility: UtilitiesService
  ) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpSetAddNewEstadoSolicitud(dataObject: any, idUser: any): Observable<any> {
    dataObject.idUsuario = idUser;
    dataObject.idEstado = "60c838243491ba293c20e98e";
    dataObject.idEspecialista = "";
    dataObject.observaciones = "estado de solicitud creado";
    console.log("objetosEstadosolicitud",dataObject);
    this.urlSetAddNewEstadoSolicitud = 'estadoSolicitud/registrarEstado';
    return this.http.post(this.utility.fnGetHost() + this.urlSetAddNewEstadoSolicitud, dataObject,
    {
      observe: 'response',
      reportProgress: true,
    });
  }
}
