import { Component, OnInit } from '@angular/core';
import { NbThemeService, NbDialogService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { UtilitiesService } from '../../services/utilities.service';
import { StateService } from "../../services/state.service";
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { UserService } from "../../services/user.service";
import { UserModule } from './user.module';
import { ProfileService } from "../../services/profile.service";
import { SignUpComponent } from "../../pages/auth/sign-up/sign-up.component";
import { EditUserComponent } from './edit-user/edit-user.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public current_payload: string = '';
  public collectionStates: Array<[]> = [];
  public collectionUser: Array<[]> = [];
  public collectionUserOriginal: Array<[]> = [];
  public collectionProfile: Array<[]> = [];
  public idProfile: string = (localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData'))['idPerfil'] : null;
  public access: boolean = (this.idProfile == "60b59445f2167c0fd787310f") ? true : false;

  constructor(
    private stateService: StateService,
    private authService: NbAuthService,
    private userService: UserService,
    private profileService: ProfileService,
    private dialogService: NbDialogService,
  ) { }
  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((Token: NbAuthJWTToken) =>{
      if(Token.isValid){
        this.current_payload = Token.getValue();

        this.fnGetListUser(this.current_payload, resp =>{
          if(resp){
            this.collectionUser = resp['body']['usuario'];
            console.log("usuario", this.collectionUser);
          }
        });

        this.fnGetListProfile(this.current_payload, resp => { 
          if (resp) {
            this.collectionProfile = resp['body']['perfil'];
            this.collectionUser.forEach(element => {
              let tmpPerfil = this.collectionProfile.find(resFind => element["idPerfil"] === resFind["_id"]);
              element["perfil"] = tmpPerfil['nombre'];
            });
          }
        });
        
        this.fnGetListState(this.current_payload, resp => { 
          if (resp) {
            this.collectionStates = resp['body']['estado'];
            this.collectionUser.forEach(element => {
              let tmpEstado = this.collectionStates.find(resFind => element["idEstado"] === resFind["_id"]);              
              element["estado"] = tmpEstado['nombre'];
            });
          }
        });
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

  fnGetListUser(current_payload, callback) {
    this.userService.fnHttpGetListUser().subscribe(resp => {
      callback(resp);
    }, error => {
      callback(false);
    });
  }

  fnGetListProfile(current_payload, callback) {
    this.profileService.fnHttpGetProfilesList().subscribe(resp => {
      callback(resp);
    }, error => {
      callback(false);
    });
  }

  fnShowCreate() {
    let object_send = {};
    let dataObject = {}
    object_send['dataObject'] = dataObject;
    this.dialogService.open(SignUpComponent , { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        if (this.access) {
          //this.fnGetListDocumentTypeAdmin(this.current_payload);
        } else {
          //this.fnGetListDocumentType(this.current_payload);  
        }
      }
    });
  }
  fnShowEdit(dataItem) {
    let object_send = {};
    let dataObject = dataItem;
    object_send['dataObject'] = dataObject;
    this.dialogService.open(EditUserComponent, { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        if (this.access) {
         // this.fnGetListDocumentTypeAdmin(this.current_payload);  
        } else {
         // this.fnGetListDocumentType(this.current_payload);  
        }
      }
    });
  }
}
