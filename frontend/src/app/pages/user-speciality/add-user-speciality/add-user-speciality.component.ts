import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ActivatedRoute, Router } from '@angular/router';

import { UserSpecialityService } from '../../../services/user-speciality.service'
import { UtilitiesService } from '../../../services/utilities.service';
import { StateService } from '../../../services/state.service';
import { SpecialtyService } from '../../../services/specialty.service'
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'ngx-add-user-speciality',
  templateUrl: './add-user-speciality.component.html',
  styleUrls: ['./add-user-speciality.component.scss']
})
export class AddUserSpecialityComponent implements OnInit {

  @Input() dataObject: any;
  current_payload: string = null;
  submitted: boolean = false;
  collectionStates: Array<[]> = [];
  collectionUsers: Array<[]> = [];
  collectionSpecialities: Array<[]> = [];

  public idProfile: string = (localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData'))['idPerfil'] : null;
  public access: boolean = (this.idProfile == "60b59445f2167c0fd787310f") ? true : false;

  userSpecialist: any = {};


  constructor(
    private userSpecialistService: UserSpecialityService,
    private utilitiesService: UtilitiesService,
    private stateService: StateService,
    private userService: UserService,
    private specialtyService: SpecialtyService,
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<AddUserSpecialityComponent>
  ) { }

  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      console.log('token: ', token);
      if (token.isValid()) {
        // // here we receive a payload from the token and assigne it to our `user` variable
        this.current_payload = token.getValue();
        console.log('this.current_payload: ', this.current_payload);
        this.fnGetListState(this.current_payload);
        this.fnGetListSpecialities();
        this.fnGetListUser()
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

  fnGetListSpecialities() {
    this.specialtyService.fnHttpGetSpecialtiesList().subscribe(resp => {
      this.collectionSpecialities = resp['body']['especialidad'];
    }, error => {
      console.log('error: ', error);
    })
  }

  fnGetListUser() {
    this.userService.fnHttpGetListUser().subscribe(resp => {
      this.collectionUsers = resp['body']['usuario'];
    }, error => { console.log('error: ', error) })
  }

  fnAddData(addDataForm) {
    console.log('addDataForm: ', addDataForm);
    console.log('this.userSpecialist: ', this.userSpecialist);
    this.submitted = true;
    this.userSpecialist['idEstado'] = (this.userSpecialist['idEstado']) ? this.userSpecialist['idEstado'] : "60b290c9084ecb101b56809e";
    this.userSpecialistService.fnHttpSetAddNewuserSpecialist(this.userSpecialist).subscribe(resp => {
      console.log('resp: ', resp);
      setTimeout(() => {
        this.utilitiesService.showToast('top-right', 'success', 'El Especialista ha sido registrado satisfactoriamente!');
        this.submitted = false;
        this.userSpecialist = {};
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
