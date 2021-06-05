import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ActivatedRoute, Router } from '@angular/router';

import { DocumentTypeService } from '../../../services/document-type.service';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
  selector: 'ngx-add-document-type',
  templateUrl: './add-document-type.component.html',
  styleUrls: ['./add-document-type.component.scss']
})
export class AddDocumentTypeComponent implements OnInit {

  @Input() dataObject: any;
  current_payload: string = null;
  submitted: boolean = false;

  documentType: any = {};

  constructor(
    private documentTypeService: DocumentTypeService,
    private utilitiesService: UtilitiesService,
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<AddDocumentTypeComponent>,
  ) { }

  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      console.log('token: ', token);
      if (token.isValid()) {
        // // here we receive a payload from the token and assigne it to our `user` variable
        // this.current_payload = token.getValue();
        // // here we change the current token for the company token
        // this.current_payload = this.company_payload;
      }
    });
  }

  fnAddData(addDataForm) {
    console.log('addDataForm: ', addDataForm);
    // this.documentType
    console.log('this.documentType: ', this.documentType);
    this.submitted = true;
    this.documentTypeService.fnHttpSetAddNewDocumentType(this.documentType).subscribe(resp => {
      console.log('resp: ', resp);
      setTimeout(() => {
        this.utilitiesService.showToast('top-right', 'success', 'El tipo de documento ha sido registrado satisfactoriamente!');
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
