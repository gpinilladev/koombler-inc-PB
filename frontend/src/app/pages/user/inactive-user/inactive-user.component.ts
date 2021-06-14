import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from "../../../services/user.service";
import { UtilitiesService } from '../../../services/utilities.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'ngx-inactive-user',
  templateUrl: './inactive-user.component.html',
  styleUrls: ['./inactive-user.component.scss']
})
export class InactiveUserComponent implements OnInit {

  @Input() dataObject: any;
  current_payload: string = null;
  submitted: boolean = false;
  idItemData: any = null;
  collectionStates: Array<[]> = [];
  public idProfile: string = (localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData'))['idPerfil'] : null;
  public access: boolean = (this.idProfile == "60b59445f2167c0fd787310f") ? true : false;

  user: any = {};

  constructor(
    private userServices: UserService,
    private stateService: StateService,
    private utilitiesService: UtilitiesService,
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<InactiveUserComponent>
  ) { }

  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      console.log('token: ', token);
      if (token.isValid()) {
        this.current_payload = token.getValue();
        console.log('this.current_payload: ', this.current_payload);
        console.log('this.dataObject: ', this.dataObject);
        this.idItemData = this.dataObject['_id'];
        this.user = this.dataObject;
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
  
  fnEditInactiveData(editInactiveDataForm) {
    console.log('editInactiveDataForm: ', editInactiveDataForm);
    console.log('this.user: ', this.user);
    this.submitted = true;
    this.user['idEstado'] = (this.user['idEstado']) ? this.user['idEstado'] : "60b290c9084ecb101b56809e";
    this.userServices.fnHttpSetEditInactivarUser(this.user, this.idItemData).subscribe(resp => {
      setTimeout(() => {
        this.utilitiesService.showToast('top-right', 'success', 'El usuario ha sido inactivado satisfactoriamente!');
        this.submitted = false;
        this.user = {};
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

  fnCancelInactiveData() {
    this.submitted = false;
    this.dismiss();
  }

}
