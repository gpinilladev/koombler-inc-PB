import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbDialogService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

// import { EditSpecialtyComponent } from './edit-specialty/edit-specialty.component';
// import { DeleteSpecialtyComponent } from './delete-specialty/delete-specialty.component';
import { Router } from '@angular/router';
import { UtilitiesService } from '../../services/utilities.service';

import { AddSpecialtyComponent } from './add-specialty/add-specialty.component';

import { SpecialtyService } from '../../services/specialty.service';
import { StateService } from '../../services/state.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'ngx-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss']
})
export class SpecialtyComponent implements OnDestroy, OnInit {

  public collectionSpecialties: Array<[]> = [];
  public collectionSpecialtiesOriginal: Array<[]> = [];
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
    private specialtyService: SpecialtyService,
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
              this.fnGetListSpecialtyAdmin(this.current_payload);  
            } else {
              this.fnGetListSpecialty(this.current_payload);  
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

  fnGetListSpecialty(current_payload) {
    this.collectionSpecialties = [];
    this.specialtyService.fnHttpGetSpecialtiesList().subscribe(resp => {
      // this.collectionProfiles = resp['body']['Especialidad'];
      let collectionSpecialties = resp['body']['Especialidad'];
      collectionSpecialties.forEach(element => {
        let state = this.collectionStates.find(resFind => element["idEstado"] === resFind["_id"]);
        element["state"] = state['nombre'];
        this.collectionSpecialties.push(element);
        this.collectionSpecialtiesOriginal.push(element);
      });
    }, error => {
    });
  }

  fnGetListSpecialtyAdmin(current_payload) {
    this.collectionSpecialties = [];
    this.specialtyService.fnHttpGetSpecialtiesAdmin(current_payload).subscribe(resp => {
      // this.collectionProfiles = resp['body']['Especialidad'];
      let collectionSpecialties = resp['body']['Especialidad'];
      console.log('collectionSpecialties: ', collectionSpecialties);
      collectionSpecialties.forEach(element => {
        let state = this.collectionStates.find(resFind => element["idEstado"] === resFind["_id"]);
        console.log('state: ', state);
        element["state"] = state['nombre'];
        this.collectionSpecialties.push(element);
        this.collectionSpecialtiesOriginal.push(element);
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
    this.dialogService.open(AddSpecialtyComponent, { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        if (this.access) {
          this.fnGetListSpecialtyAdmin(this.current_payload);  
        } else {
          this.fnGetListSpecialty(this.current_payload);  
        }
      }
    });
  }

  fnShowEdit(dataItem) {
    let object_send = {};
    let dataObject = dataItem;
    object_send['dataObject'] = dataObject;
    // this.dialogService.open(EditSpecialtyComponent, { context: object_send }).onClose.subscribe((res) => {
    //   if(res) {
    //     if (this.access) {
    //       this.fnGetListSpecialtyAdmin(this.current_payload);  
    //     } else {
    //       this.fnGetListSpecialty(this.current_payload);  
    //     }
    //   }
    // });
  }

  fnShowDelete(dataItem) {
    let object_send = {};
    let dataObject = dataItem;
    object_send['dataObject'] = dataObject;
    // this.dialogService.open(DeleteSpecialtyComponent, { context: object_send }).onClose.subscribe((res) => {
    //   if(res) {
    //     if (this.access) {
    //       this.fnGetListSpecialtyAdmin(this.current_payload);  
    //     } else {
    //       this.fnGetListSpecialty(this.current_payload);  
    //     }
    //   }
    // });
  }

  fnSearchData(textSearch) {
    console.log('textSearch: ', textSearch);
    let collection = JSON.parse(JSON.stringify(this.collectionSpecialtiesOriginal));
    if (textSearch.length > 1) {
      this.collectionSpecialties = this.utilitiesService.fnSearchTextInArrayObjects(collection, textSearch);
    } else {
      this.collectionSpecialties = this.collectionSpecialtiesOriginal;
    }
  }

  ngOnDestroy() {
  }

}
