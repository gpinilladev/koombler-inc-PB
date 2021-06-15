import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbDialogService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

import { AddProfileComponent } from './add-profile/add-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DeleteProfileComponent } from './delete-profile/delete-profile.component';
import { Router } from '@angular/router';
import { UtilitiesService } from '../../services/utilities.service';

import { ProfileService } from '../../services/profile.service';
import { StateService } from '../../services/state.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy, OnInit {

  public collectionProfiles: Array<[]> = [];
  public collectionProfilesOriginal: Array<[]> = [];
  public collectionStates: Array<[]> = [];
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
    private profileService: ProfileService,
    private stateService: StateService,
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
              this.fnGetListProfileAdmin(this.current_payload);  
            } else {
              this.fnGetListProfile(this.current_payload);  
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

  fnGetListProfile(current_payload) {
    this.collectionProfiles = [];
    this.profileService.fnHttpGetProfiles().subscribe(resp => {
      // this.collectionProfiles = resp['body']['perfil'];
      let collectionProfiles = resp['body']['perfil'];
      collectionProfiles.forEach(element => {
        let state = this.collectionStates.find(resFind => element["idEstado"] === resFind["_id"]);
        element["state"] = state;
        this.collectionProfiles.push(element);
        this.collectionProfilesOriginal.push(element);
      });
    }, error => {
    });
  }

  fnGetListProfileAdmin(current_payload) {
    this.collectionProfiles = [];
    this.profileService.fnHttpGetProfilesAdmin(current_payload).subscribe(resp => {
      // this.collectionProfiles = resp['body']['perfil'];
      let collectionProfiles = resp['body']['perfil'];
      console.log('collectionProfiles: ', collectionProfiles);
      collectionProfiles.forEach(element => {
        let state = this.collectionStates.find(resFind => element["idEstado"] === resFind["_id"]);
        console.log('state: ', state);
        element["state"] = state['nombre'];
        this.collectionProfiles.push(element);
        this.collectionProfilesOriginal.push(element);
      });
    }, error => {
    });
  }

  fnGetListState(current_payload, callback) {
    this.stateService.fnHttpGetStateList(current_payload).subscribe(resp => {
      callback(resp);
    }, error => {
      callback(false);
    });
  }
 
  fnShowCreate() {
    let object_send = {};
    let dataObject = {}
    object_send['dataObject'] = dataObject;
    this.dialogService.open(AddProfileComponent, { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        if (this.access) {
          this.fnGetListProfileAdmin(this.current_payload);  
        } else {
          this.fnGetListProfile(this.current_payload);  
        }
      }
    });
  }

  fnShowEdit(dataItem) {
    let object_send = {};
    let dataObject = dataItem;
    object_send['dataObject'] = dataObject;
    this.dialogService.open(EditProfileComponent, { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        if (this.access) {
          this.fnGetListProfileAdmin(this.current_payload);  
        } else {
          this.fnGetListProfile(this.current_payload);  
        }
      }
    });
  }

  fnShowDelete(dataItem) {
    let object_send = {};
    let dataObject = dataItem;
    object_send['dataObject'] = dataObject;
    this.dialogService.open(DeleteProfileComponent, { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        if (this.access) {
          this.fnGetListProfileAdmin(this.current_payload);  
        } else {
          this.fnGetListProfile(this.current_payload);  
        }
      }
    });
  }

  fnSearchData(textSearch) {
    console.log('textSearch: ', textSearch);
    let collection = JSON.parse(JSON.stringify(this.collectionProfilesOriginal));
    if (textSearch.length > 1) {
      this.collectionProfiles = this.utilitiesService.fnSearchTextInArrayObjects(collection, textSearch);
    } else {
      this.collectionProfiles = this.collectionProfilesOriginal;
    }
  }

  ngOnDestroy() {
  }

}
