import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ActivatedRoute, Router } from '@angular/router';

import { SpecialtyService } from '../../../services/specialty.service';
import { UtilitiesService } from '../../../services/utilities.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'ngx-add-specialty',
  templateUrl: './add-specialty.component.html',
  styleUrls: ['./add-specialty.component.scss']
})
export class AddSpecialtyComponent implements OnInit {

  @Input() dataObject: any;
  current_payload: string = null;
  submitted: boolean = false;
  collectionStates: Array<[]> = [];
  public idProfile: string = (localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData'))['idPerfil'] : null;
  public access: boolean = (this.idProfile == "60b59445f2167c0fd787310f") ? true : false;

  specialty: any = {};

  constructor(
    private specialtyService: SpecialtyService,
    private utilitiesService: UtilitiesService,
    private stateService: StateService,
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<AddSpecialtyComponent>,
  ) { }

  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      console.log('token: ', token);
      if (token.isValid()) {
        // // here we receive a payload from the token and assigne it to our `user` variable
        this.current_payload = token.getValue();
        console.log('this.current_payload: ', this.current_payload);
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

  fnAddData(addDataForm) {
    console.log('addDataForm: ', addDataForm);
    console.log('this.specialty: ', this.specialty);
    this.submitted = true;
    this.specialty['idEstado'] = (this.specialty['idEstado']) ? this.specialty['idEstado'] : "60b290c9084ecb101b56809e";
    this.specialtyService.fnHttpSetAddNewSpecialty(this.specialty).subscribe(resp => {
      console.log('resp: ', resp);
      setTimeout(() => {
        this.utilitiesService.showToast('top-right', 'success', 'El tipo de documento ha sido registrado satisfactoriamente!');
        this.submitted = false;
        this.specialty = {};
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
