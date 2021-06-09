import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ActivatedRoute, Router } from '@angular/router';

import { DocumentTypeService } from '../../../services/document-type.service';
import { UtilitiesService } from '../../../services/utilities.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'ngx-edit-document-type',
  templateUrl: './edit-document-type.component.html',
  styleUrls: ['./edit-document-type.component.scss']
})
export class EditDocumentTypeComponent implements OnInit {

  @Input() dataObject: any;
  current_payload: string = null;
  submitted: boolean = false;
  idItemData: any = null;
  collectionStates: Array<[]> = [];
  public idProfile: string = (localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData'))['idPerfil'] : null;
  public access: boolean = (this.idProfile == "60b59445f2167c0fd787310f") ? true : false;

  documentType: any = {};

  constructor(
    private documentTypeService: DocumentTypeService,
    private stateService: StateService,
    private utilitiesService: UtilitiesService,
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<EditDocumentTypeComponent>,
  ) { }

  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      console.log('token: ', token);
      if (token.isValid()) {
        // // here we receive a payload from the token and assigne it to our `user` variable
        this.current_payload = token.getValue();
        console.log('this.current_payload: ', this.current_payload);
        console.log('this.dataObject: ', this.dataObject);
        this.idItemData = this.dataObject['_id'];
        this.documentType = this.dataObject;
        console.log('this.idItemData: ', this.idItemData);
        this.fnGetListState(this.current_payload);
      } else {
        this.utilitiesService.fnDestroySession();
      }
    });
  }

  fnGetListState(current_payload) {
    this.stateService.fnHttpGetStateList(current_payload).subscribe(resp => {
      this.collectionStates = resp['body']['estado'];
    }, error => {
      console.log('error: ', error);
    });
  }

  fnEditData(editDataForm) {
    console.log('editDataForm: ', editDataForm);
    console.log('this.documentType: ', this.documentType);
    this.submitted = true;
    this.documentType['idEstado'] = (this.documentType['idEstado']) ? this.documentType['idEstado'] : "60b290c9084ecb101b56809e";
    this.documentTypeService.fnHttpSetEditDocumentType(this.documentType, this.idItemData).subscribe(resp => {
      console.log('resp: ', resp);
      setTimeout(() => {
        this.utilitiesService.showToast('top-right', 'success', 'El tipo de documento ha sido actualizado satisfactoriamente!');
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

  fnCancelEditData() {
    this.submitted = false;
    this.dismiss();
  }

}
