import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilitiesService } from "../services/utilities.service";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DocumentTypeService {
  url_host: any = environment.apiUrl;
  data_headers_request: any = "";

  urlGetListDocumentTypes: string = "";
  urlSetAddNewDocumentType: string = "";
  urlSetEditDocumentType: string = "";
  urlSetDeleteDocumentType: string = "";

  constructor(public http: HttpClient, private utility: UtilitiesService) {}

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set("Authorization", payload);
    return this.data_headers_request;
  }

  fnHttpGetListDocumentTypes(): Observable<any> {
    this.urlGetListDocumentTypes =
      "tipoIdentificacion/listaTipoIdentificaciones";
    return this.http.get(
      this.utility.fnGetHost() + this.urlGetListDocumentTypes,
      {
        observe: "response",
        reportProgress: true,
      }
    );
  }

  fnHttpGetListDocumentTypesAdmin(token: string): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlGetListDocumentTypes =
      "tipoIdentificacion/listaTipoIdentificacionesAdmin";
    return this.http.get(
      this.utility.fnGetHost() + this.urlGetListDocumentTypes,
      {
        observe: "response",
        headers: headers,
        reportProgress: true,
      }
    );
  }

  fnHttpSetAddNewDocumentType(dataObject: any): Observable<any> {
    this.urlSetAddNewDocumentType =
      "tipoIdentificacion/registrarTipoIdentificacion";
    return this.http.post(
      this.utility.fnGetHost() + this.urlSetAddNewDocumentType,
      dataObject,
      {
        observe: "response",
        reportProgress: true,
      }
    );
  }

  fnHttpSetEditDocumentType(dataObject: any, id: any): Observable<any> {
    this.urlSetEditDocumentType =
      "tipoIdentificacion/editarTipoIdentificacion/" + id;
    return this.http.put(
      this.utility.fnGetHost() + this.urlSetEditDocumentType,
      dataObject,
      {
        observe: "response",
        reportProgress: true,
      }
    );
  }

  fnHttpSetDeleteDocumentType(dataObject: any, id: any): Observable<any> {
    this.urlSetDeleteDocumentType =
      "tipoIdentificacion/inactivarTipoIdentificacion/" + id;
    return this.http.put(
      this.utility.fnGetHost() + this.urlSetDeleteDocumentType,
      dataObject,
      {
        observe: "response",
        reportProgress: true,
      }
    );
  }
}
