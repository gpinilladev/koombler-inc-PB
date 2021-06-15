import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../../services/state.service';
import { UtilitiesService } from '../../../services/utilities.service';
import { SpecialtyService } from "../../../services/specialty.service";
import { SolicitudService } from "../../../services/solicitud.service";

@Component({
  selector: 'ngx-edit-solicitud',
  templateUrl: './edit-solicitud.component.html',
  styleUrls: ['./edit-solicitud.component.scss']
})
export class EditSolicitudComponent implements OnInit {

  @Input() dataObject: any;
  current_payload: string = null;
  submitted: boolean = false;
  idItemData: any = null;
  collectionEstado: Array<[]> = [];
  collectionEspecialidad: Array<[]> = [];

  public idProfile: string = (localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData'))['idPerfil'] : null;
  public access: boolean = (this.idProfile == "60b59445f2167c0fd787310f") ? true : false;

  documentType: any = {};

  constructor(
    private authService: NbAuthService,
    public router: Router,
    private stateService: StateService,
    private specialtyService: SpecialtyService,
    private utilitiesService: UtilitiesService,
    private solicitudService: SolicitudService,
    protected ref: NbDialogRef<EditSolicitudComponent>,
  ) { }

  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.current_payload = token.getValue();
        this.idItemData = this.dataObject['_id'];
        this.documentType = this.dataObject;

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
    this.specialtyService.fnHttpGetSpecialtiesList().subscribe(resp => {
      callback(resp);
    }, error => {
      callback(false);
    });
  }

  fnEditData(addDataForm) {
    this.submitted = true;
    this.solicitudService.fnHttpSetEditSolicitud(this.documentType, this.idItemData).subscribe(resp => {
      setTimeout(() => {
        this.utilitiesService.showToast('top-right', 'success', 'La solicitud ha sido actualizada satisfactoriamente!');
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
