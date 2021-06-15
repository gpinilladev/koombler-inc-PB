import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ActivatedRoute, Router } from '@angular/router';

import {StateService } from '../../../services/state.service';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
  selector: 'ngx-add-state',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.scss']
})
export class AddStateComponent implements OnInit {
  @Input() dataObject: any;
  current_payload: string = null;
  submitted: boolean = false;

  state: any = {};
  constructor(
    private stateService: StateService,
    private utilitiesService: UtilitiesService,
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<AddStateComponent>,
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
  
    console.log('this.state: ', this.state);
    this.submitted = true;
    this.stateService.fnHttpSetAddNewState(this.state).subscribe(resp => {
      console.log('resp: ', resp);
      setTimeout(() => {
        this.utilitiesService.showToast('top-right', 'success', 'El tipo de documento ha sido registrado satisfactoriamente!');
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

  fnCancelAddData() {
    this.submitted = false;
    this.dismiss();
  }
}
