import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ActivatedRoute, Router } from '@angular/router';

import {StateService } from '../../../services/state.service';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
  selector: 'ngx-edit-state',
  templateUrl: './edit-state.component.html',
  styleUrls: ['./edit-state.component.scss']
})
export class EditStateComponent implements OnInit {
  @Input() dataObject: any;
  current_payload: string = null;
  submitted: boolean = false;
  idItemData: any = null;
  state: any = {};
  constructor(
    private stateService: StateService,
    private utilitiesService: UtilitiesService,
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<EditStateComponent>,
  ) { }

  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      console.log('token: ', token);
      this.idItemData = this.dataObject['_id'];
        this.state = this.dataObject;
        console.log('this.idItemData: ', this.idItemData);
        
      if (token.isValid()) {
        // // here we receive a payload from the token and assigne it to our `user` variable
        // this.current_payload = token.getValue();
        // // here we change the current token for the company token
        // this.current_payload = this.company_payload;
      }
    });
  }
  fnEditData(editDataForm) {
    console.log('editDataForm: ', editDataForm);
  
    console.log('this.state: ', this.state);
    this.submitted = true;
    this.stateService.fnHttpSetEditState(this.state,this.idItemData).subscribe(resp => {
      console.log('resp: ', resp);
      setTimeout(() => {
        this.utilitiesService.showToast('top-right', 'success', 'El estado ha sido actualizado satisfactoriamente!');
        this.submitted = false;
        this.state = {};
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
