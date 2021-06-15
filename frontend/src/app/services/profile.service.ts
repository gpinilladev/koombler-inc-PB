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

  urlGetProfiles: string = '';
  urlGetProfilesAdmin: string = '';
  urlGetListProfiles: string = '';
  urlSetAddNewProfile: string = '';
  urlSetEditProfile: string = '';
  urlSetDeleteProfile: string = '';

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
<<<<<<< HEAD
    this.urlGetProfilesList = 'perfil/listarPerfil';
=======
    this.urlGetProfilesList = '/perfil/listaPerfiles';
>>>>>>> 08ccaaf (Crear componente listar usuario)
    return this.http.get(this.utility.fnGetHost() + this.urlGetProfilesList,
      {
        observe: 'response',
        // headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetProfiles(): Observable<any> {
    this.urlGetProfiles = 'perfil/listarPerfil';
    return this.http.get(this.utility.fnGetHost() + this.urlGetProfiles,
      {
        observe: 'response',
        reportProgress: true,
      });
  }

  fnHttpGetProfilesAdmin(token: string): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetProfilesAdmin = 'perfil/listarPerfilAdmin';
    return this.http.get(this.utility.fnGetHost() + this.urlGetProfilesAdmin,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetAddNewProfile(dataObject: any): Observable<any> {
    this.urlSetAddNewProfile = 'perfil/registrarPerfil';
    return this.http.post(this.utility.fnGetHost() + this.urlSetAddNewProfile, dataObject, 
    {
      observe: 'response',
      reportProgress: true,
    });
  }

  fnHttpSetEditProfile(dataObject: any, id: any): Observable<any> {
    this.urlSetEditProfile = 'perfil/editarPerfil/' + id;
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditProfile, dataObject, 
    {
      observe: 'response',
      reportProgress: true,
    });
  }

  fnHttpSetDeleteProfile(dataObject: any, id: any): Observable<any> {
    this.urlSetDeleteProfile = 'perfil/inactivarPerfil/' + id;
    return this.http.put(this.utility.fnGetHost() + this.urlSetDeleteProfile, dataObject, 
    {
      observe: 'response',
      reportProgress: true,
    });
  }
}
