import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../services/state.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { UtilitiesService } from '../../../services/utilities.service';
import { EspecialityService } from "../../../services/especiality.service";
import { SolicitudService } from "../../../services/solicitud.service";
import { SolicitudModule } from '../solicitud.module';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-add-solicitud',
  templateUrl: './add-solicitud.component.html',
  styleUrls: ['./add-solicitud.component.scss']
})
export class AddSolicitudComponent implements OnInit {

  current_payload: string = null;
  submitted: boolean = false;
  collectionEstado: Array<[]> = [];
  collectionEspecialidad: Array<[]> = [];

  public idUser: string = (localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData'))['_id'] : null;
  public idProfile: string = (localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData'))['idPerfil'] : null;
  public access: boolean = (this.idProfile == "60b59445f2167c0fd787310f") ? true : false;

  documentType: any = {};

  constructor(
    private stateService: StateService,
    private authService: NbAuthService,
    private utilitiesService: UtilitiesService,
    private especialityService: EspecialityService,
    private solicitudService: SolicitudService,
    protected ref: NbDialogRef<AddSolicitudComponent>,
  ) { }

  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.current_payload = token.getValue();
        
        this.fnGetListState(this.current_payload, resp => { 
          if (resp) {
            this.collectionEstado = resp['body']['estado'];
          }
        });

        this.fnGetListEspecialidad(this.current_payload, resp => {
          if(resp){
            this.collectionEspecialidad = resp['body']['especialidad'];
          }
        });
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

  fnGetListEspecialidad(current_payload, callback) {
    this.especialityService.fnHttpGetSpecialitiesList().subscribe(resp => {
      callback(resp);
    }, error => {
      callback(false);
    });
  }

  fnAddData(addDataForm) {
    this.submitted = true;
    this.solicitudService.fnHttpSetAddNewSolicitud(this.documentType, this.idUser).subscribe(resp => {
      setTimeout(() => {
        this.utilitiesService.showToast('top-right', 'success', 'La solicitud ha sido registrada satisfactoriamente!');
        this.submitted = false;
        this.documentType = {};
        this.dismiss(resp);
      }, 2000);
    }, error => {
      this.utilitiesService.showToast('top-right', 'danger', 'Ha ocurrido un error, intentalo nuevamente!');
      this.submitted = false;
      console.log('error: ', error);
    });
  }

  dismiss(res?) {
    this.ref.close(res);
  }

  fnCancelAddData() {
    this.submitted = false;
    this.dismiss();
  }
}
