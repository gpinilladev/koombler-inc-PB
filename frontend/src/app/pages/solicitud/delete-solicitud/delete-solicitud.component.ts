import { Component, OnInit, Input } from '@angular/core';
import { UtilitiesService } from '../../../services/utilities.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogRef } from '@nebular/theme';
import { SolicitudService } from "../../../services/solicitud.service";

@Component({
  selector: 'ngx-delete-solicitud',
  templateUrl: './delete-solicitud.component.html',
  styleUrls: ['./delete-solicitud.component.scss']
})
export class DeleteSolicitudComponent implements OnInit {

  @Input() dataObject: any;
  current_payload: string = null;
  submitted: boolean = false;
  idItemData: any = null;

  documentType: any = {};

  constructor(
    private utilitiesService: UtilitiesService,
    private authService: NbAuthService,
    private solicitudService: SolicitudService,
    protected ref: NbDialogRef<DeleteSolicitudComponent>,
  ) { }

  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      console.log('token: ', token);
      if (token.isValid()) {
        // // here we receive a payload from the token and assigne it to our `user` variable
        this.current_payload = token.getValue();
        this.idItemData = this.dataObject['_id'];
        this.documentType = this.dataObject;
        console.log('this.idItemData: ', this.idItemData);
      } else {
        this.utilitiesService.fnDestroySession();
      }
    });
  }

  fnDeleteData(deleteDataForm) {
    this.submitted = true;
    this.solicitudService.fnHttpSetDeleteSolicitud(this.documentType, this.idItemData).subscribe(resp => {
      console.log('resp: ', resp);
      setTimeout(() => {
        this.utilitiesService.showToast('top-right', 'success', 'la solicitud ha sido eliminado satisfactoriamente!');
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

  fnCancelDeleteData() {
    this.submitted = false;
    this.dismiss();
  }
}
