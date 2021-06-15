import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbDialogService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

import { AddDocumentTypeComponent } from './add-document-type/add-document-type.component';
import { EditDocumentTypeComponent } from './edit-document-type/edit-document-type.component';
import { DeleteDocumentTypeComponent } from './delete-document-type/delete-document-type.component';
import { Router } from '@angular/router';
import { UtilitiesService } from '../../services/utilities.service';

import { DocumentTypeService } from '../../services/document-type.service';
import { StateService } from '../../services/state.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'ngx-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.scss']
})
export class DocumentTypeComponent implements OnDestroy, OnInit {

  public collectionDocumentTypes: Array<[]> = [];
  public collectionDocumentTypesOriginal: Array<[]> = [];
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
    private documentTypeService: DocumentTypeService,
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
              this.fnGetListDocumentTypeAdmin(this.current_payload);  
            } else {
              this.fnGetListDocumentType(this.current_payload);  
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

  fnGetListDocumentType(current_payload) {
    this.collectionDocumentTypes = [];
    this.documentTypeService.fnHttpGetListDocumentTypes().subscribe(resp => {
      // this.collectionDocumentTypes = resp['body']['tipoIdentificacion'];
      let collectionDocumentTypes = resp['body']['tipoIdentificacion'];
      collectionDocumentTypes.forEach(element => {
        let state = this.collectionStates.find(resFind => element["idEstado"] === resFind["_id"]);
        element["state"] = state['nombre'];
        this.collectionDocumentTypes.push(element);
        this.collectionDocumentTypesOriginal.push(element);
      });
    }, error => {
    });
  }

  fnGetListDocumentTypeAdmin(current_payload) {
    this.collectionDocumentTypes = [];
    this.documentTypeService.fnHttpGetListDocumentTypesAdmin(current_payload).subscribe(resp => {
      // this.collectionDocumentTypes = resp['body']['tipoIdentificacion'];
      let collectionDocumentTypes = resp['body']['tipoIdentificacion'];
      collectionDocumentTypes.forEach(element => {
        let state = this.collectionStates.find(resFind => element["idEstado"] === resFind["_id"]);
        console.log('state: ', state);
        element["state"] = state['nombre'];
        this.collectionDocumentTypes.push(element);
        this.collectionDocumentTypesOriginal.push(element);
      });
    }, error => {
    });
  }

  fnGetListState(current_payload, callback) {
    // this.stateService.fnHttpGetStateList(current_payload).subscribe(resp => {
    this.stateService.fnHttpGetListState().subscribe(resp => {
      callback(resp);
    }, error => {
      callback(false);
    });
  }
 
  fnShowCreate() {
    let object_send = {};
    let dataObject = {}
    object_send['dataObject'] = dataObject;
    this.dialogService.open(AddDocumentTypeComponent, { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        if (this.access) {
          this.fnGetListDocumentTypeAdmin(this.current_payload);  
        } else {
          this.fnGetListDocumentType(this.current_payload);  
        }
      }
    });
  }

  fnShowEdit(dataItem) {
    let object_send = {};
    let dataObject = dataItem;
    object_send['dataObject'] = dataObject;
    this.dialogService.open(EditDocumentTypeComponent, { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        if (this.access) {
          this.fnGetListDocumentTypeAdmin(this.current_payload);  
        } else {
          this.fnGetListDocumentType(this.current_payload);  
        }
      }
    });
  }

  fnShowDelete(dataItem) {
    let object_send = {};
    let dataObject = dataItem;
    object_send['dataObject'] = dataObject;
    this.dialogService.open(DeleteDocumentTypeComponent, { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        if (this.access) {
          this.fnGetListDocumentTypeAdmin(this.current_payload);  
        } else {
          this.fnGetListDocumentType(this.current_payload);  
        }
      }
    });
  }

  fnSearchData(textSearch) {
    console.log('textSearch: ', textSearch);
    let collection = JSON.parse(JSON.stringify(this.collectionDocumentTypesOriginal));
    if (textSearch.length > 1) {
      this.collectionDocumentTypes = this.utilitiesService.fnSearchTextInArrayObjects(collection, textSearch);
    } else {
      this.collectionDocumentTypes = this.collectionDocumentTypesOriginal;
    }
  }

  ngOnDestroy() {
  }

}
