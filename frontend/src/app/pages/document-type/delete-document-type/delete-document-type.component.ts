import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ActivatedRoute, Router } from '@angular/router';

import { DocumentTypeService } from '../../../services/document-type.service';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
  selector: 'ngx-delete-document-type',
  templateUrl: './delete-document-type.component.html',
  styleUrls: ['./delete-document-type.component.scss']
})
export class DeleteDocumentTypeComponent implements OnInit {

  @Input() dataObject: any;
  current_payload: string = null;
  submitted: boolean = false;
  idItemData: any = null;

  documentType: any = {};

  constructor(
    private documentTypeService: DocumentTypeService,
    private utilitiesService: UtilitiesService,
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<DeleteDocumentTypeComponent>,
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
      } else {
        this.utilitiesService.fnDestroySession();
      }
    });
  }

  fnDeleteData(deleteDataForm) {
    console.log('deleteDataForm: ', deleteDataForm);
    console.log('this.documentType: ', this.documentType);
    this.submitted = true;
    this.documentTypeService.fnHttpSetDeleteDocumentType(this.documentType, this.idItemData).subscribe(resp => {
      console.log('resp: ', resp);
      setTimeout(() => {
        this.utilitiesService.showToast('top-right', 'success', 'El tipo de documento ha sido eliminado satisfactoriamente!');
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
