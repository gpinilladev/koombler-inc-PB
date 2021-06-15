import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbDialogService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { SolicitudService } from "../../services/solicitud.service";
import { StateService } from '../../services/state.service';
import { UtilitiesService } from '../../services/utilities.service';
import { UserService } from "../../services/user.service";
import { EspecialityService } from "../../services/especiality.service";
import { AddSolicitudComponent } from "./add-solicitud/add-solicitud.component";
import { EditSolicitudComponent } from "./edit-solicitud/edit-solicitud.component";
import { DeleteSolicitudComponent } from "./delete-solicitud/delete-solicitud.component";

@Component({
  selector: 'ngx-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})


export class SolicitudComponent implements OnInit {

  public collectionSolicitudes: Array<[]> = [];
  public collectionUsuario: Array<[]> = [];
  public collectionEstado: Array<[]> = [];
  public collectionEspecialidad: Array<[]> = [];
  public current_payload: string = '';
  public usuario: string='';
  public especialidad: string='';
  public estado: string='';
  public idProfile: string = (localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData'))['idPerfil'] : null;
  public access: boolean = (this.idProfile == "60b59445f2167c0fd787310f") ? true : false;

  constructor (
    private themeService: NbThemeService,
    private authService: NbAuthService,
    private solicitudService:SolicitudService,
    private stateService: StateService,
    private utilitiesService: UtilitiesService,
    private especialityService: EspecialityService,
    private userService: UserService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.current_payload = token.getValue();
        this.fnGetAllData();
      }
    });
  }

  fnGetAllData(){
    this.fnGetListSolicitudes(this.current_payload, resp => {
      if (resp) {
        this.collectionSolicitudes = resp['body']['solicitud'];
      }
    });

    this.fnGetListState(this.current_payload, resp => {
      if (resp) {
        this.collectionEstado = resp['body']['estado'];
        this.collectionSolicitudes.forEach(element => {
          let tmpEstado = this.collectionEstado.find(resFind => element["idEstado"] === resFind["_id"]);
          element["estado"] = tmpEstado['nombre'];
          //this.collectionSolicitudes.push(element); 
        });
      }
    });

    this.fnGetListUsuario(this.current_payload, resp => {
      if (resp) {
        this.collectionUsuario = resp['body']['usuario'];
        this.collectionSolicitudes.forEach(element => {
          let tmpusuario = this.collectionUsuario.find(resFind => element["idUsuario"] === resFind["_id"]);
          element["Usuario"] = tmpusuario['nombres'] + ' ' + tmpusuario['apellidos'];
          //this.collectionSolicitudes.push(element);
        });
      }
    });

    this.fnGetListEspecialidad(this.current_payload, resp => {
      if (resp) {
        this.collectionEspecialidad = resp['body']['especialidad'];
        this.collectionSolicitudes.forEach(element => {
          let tmpespecialidad = this.collectionEspecialidad.find(resFind => element["idEspecialidad"] === resFind["_id"]);
          element["especialidad"] = tmpespecialidad['nombre'];
          //this.collectionSolicitudes.push(element);
        });
      }
    });
  }

  fnShowCreate() {
    let object_send = {};
    let dataObject = {}
    object_send['dataObject'] = dataObject;
    this.dialogService.open(AddSolicitudComponent, { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        if (this.access) {
          this.fnGetAllData();
        } 
      }
    });
  }

  fnShowEdit(dataItem) {
    let object_send = {};
    let dataObject = dataItem;
    object_send['dataObject'] = dataObject;
    this.dialogService.open(EditSolicitudComponent, { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        if (this.access) {
          this.fnGetAllData();
        }
      }
    });
  }

  fnShowDelete(dataItem) {
    let object_send = {};
    let dataObject = dataItem;
    object_send['dataObject'] = dataObject;
    this.dialogService.open(DeleteSolicitudComponent, { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        if (this.access) {
          this.fnGetAllData();
        }
      }
    });
  }
  
  fnGetListState(current_payload, callback) {
    this.stateService.fnHttpGetStateList(current_payload).subscribe(resp => {
      callback(resp);
    }, error => {
      callback(false);
    });
  }

  fnGetListUsuario(current_payload, callback) {
    this.userService.fnHttpGetListUser().subscribe(resp => {
      callback(resp);
    }, error => {
      callback(false);
    });
  }

  fnGetListEspecialidad(current_payload, callback) {
    this.especialityService.fnHttpGetSpecialitiesList().subscribe(resp => {
      callback(resp);
    }, error => {
      callback(false);
    });
  }

  fnGetListSolicitudes(current_payload, callback) {
    this.solicitudService.fnHttpGetSolicitudesList().subscribe(resp => {
      callback(resp);
    }, error => {
      callback(false);
    });
  }
}
