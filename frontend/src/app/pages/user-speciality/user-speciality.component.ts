import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbDialogService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

import { Router } from '@angular/router';
import { UtilitiesService } from '../../services/utilities.service';
import { StateService } from '../../services/state.service';
import { Observable } from 'rxjs';
import { UserSpecialityService } from '../../services/user-speciality.service';
import { EspecialityService } from '../../services/especiality.service'
import { UserService } from '../../services/user.service'


import { AddUserSpecialityComponent } from './add-user-speciality/add-user-speciality.component'
import { DeleteUserSpecialityComponent } from './delete-user-speciality/delete-user-speciality.component';
import { EditUserSpecialityComponent } from './edit-user-speciality/edit-user-speciality.component';


@Component({
  selector: 'ngx-user-speciality',
  templateUrl: './user-speciality.component.html',
  styleUrls: ['./user-speciality.component.scss']
})
export class UserSpecialityComponent implements OnInit {

  public collectionUserSpeciality: Array<[]> = [];
  public collectionUserSpecialityOriginal: Array<[]> = [];
  public collectionStates: Array<[]> = [];

  collectionUsers: Array<[]> = [];
  collectionSpecialities: Array<[]> = [];

  public numItemsPage: number = 10;
  public currentPage: number = 1;
  public current_payload: string = '';
  public textSearch: string = '';
  public idProfile: string = (localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData'))['idPerfil'] : null;
  public access: boolean = (this.idProfile == "60b59445f2167c0fd787310f") ? true : false;


  constructor(
    private themeService: NbThemeService,
    private dialogService: NbDialogService,
    private authService: NbAuthService,
    private router: Router,
    private utilitiesService: UtilitiesService,
    private userSpecialityService: UserSpecialityService,
    private stateService: StateService,
    private userService: UserService,
    private specialitiesService: EspecialityService,
  ) { }

  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        // // here we receive a payload from the token and assigne it to our `user` variable
        this.current_payload = token.getValue();
        this.fnGetListState(this.current_payload, resp => {
          if (resp) {
            this.collectionStates = resp['body']['estado'];
            if (this.access) {
              this.fnGetListUserSpecialityAdmin(this.current_payload);
              this.fnGetListSpecialities();
              this.fnGetListUser()
            } else {
              this.fnGetListUserSpeciality(this.current_payload);
              this.fnGetListSpecialities();
              this.fnGetListUser()
            }
          } else {
            this.utilitiesService.fnDestroySession();
          }
        });
      } else {
        this.utilitiesService.fnDestroySession();
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

  fnGetListSpecialities() {
    this.specialitiesService.fnHttpGetSpecialitiesList().subscribe(resp => {
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

  fnGetListUserSpecialityAdmin(current_payload) {

    this.collectionUserSpeciality = [];
    this.userSpecialityService.fnHttpGetListUserSpecialityAdmin(current_payload).subscribe(resp => {
      let collectionUserSpeciality = resp['body']['usuarioEspecialidad'];
      collectionUserSpeciality.forEach(element => {
        let state = this.collectionStates.find(resFind => element["idEstado"] === resFind["_id"]);
        let user = this.collectionUsers.find(resFind => element["idUsuario"] === resFind["_id"] );
        let speciality = this.collectionSpecialities.find(resFind => element["idEspecialidad"]=== resFind["_id"]);
        console.log('state: ', state);
        console.log('user: ', user);
        console.log('speciality: ', speciality);
        element["state"] = state['nombre'];
        element["user"] = user['nombres'];
        element["speciality"] = speciality['nombre'];
        this.collectionUserSpeciality.push(element);
        this.collectionUserSpecialityOriginal.push(element);
      });
    }, error => {
    });
  }

  // fnGetListUserSpecialityAdmin(current_payload) {


  //   this.userSpecialityService.fnHttpGetListUserSpecialityAdmin(current_payload).subscribe(resp => {
  //     this.collectionUserSpeciality = resp['body']['usuarioEspecialidad'];
  //     console.log('paso por aca 50 ', this.collectionUserSpeciality = resp['body']['usuarioEspecialidad'])
  //   }, error => {
  //   });
  // }

  fnGetListUserSpeciality(current_payload) {
    this.collectionUserSpeciality = [];
    this.userSpecialityService.fnHttpGetListUserSpeciality().subscribe(resp => {
      let collectionUserSpeciality = resp['body']['usuarioEspecialidad'];
      collectionUserSpeciality.forEach(element => {
        let state = this.collectionStates.find(resFind => element["idEstado"] === resFind["_id"]);
        element["state"] = state;
        this.collectionUserSpeciality.push(element);
        this.collectionUserSpecialityOriginal.push(element);
      });
    }, error => {
    });
  }

  fnSearchData(textSearch) {
    console.log('textSearch: ', textSearch);
    let collection = JSON.parse(JSON.stringify(this.collectionUserSpecialityOriginal));
    if (textSearch.length > 1) {
      this.collectionUserSpeciality = this.utilitiesService.fnSearchTextInArrayObjects(collection, textSearch);
    } else {
      this.collectionUserSpeciality = this.collectionUserSpecialityOriginal;
    }
  }

  fnShowCreate() {
    let object_send = {};
    let dataObject = {}
    object_send['dataObject'] = dataObject;
    this.dialogService.open(AddUserSpecialityComponent, { context: object_send }).onClose.subscribe((res) => {
      if (res) {
        if (this.access) {
          this.fnGetListUserSpecialityAdmin(this.current_payload);
        } else {
          this.fnGetListUserSpeciality(this.current_payload);
        }
      }
    });
  }

  fnShowDelete(dataItem) {
    let object_send = {};
    let dataObject = dataItem;
    object_send['dataObject'] = dataObject;
    this.dialogService.open(DeleteUserSpecialityComponent, { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        if (this.access) {
          this.fnGetListUserSpecialityAdmin(this.current_payload); 
        } else {
          this.fnGetListUserSpeciality(this.current_payload);
        }
      }
    });
  }

  fnShowEdit(dataItem) {
    let object_send = {};
    let dataObject = dataItem;
    object_send['dataObject'] = dataObject;
    this.dialogService.open(EditUserSpecialityComponent, { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        if (this.access) {
          this.fnGetListUserSpecialityAdmin(this.current_payload); 
        } else {
          this.fnGetListUserSpeciality(this.current_payload);  
        }
      }
    });
  }


  ngOnDestroy() {
  }

}
