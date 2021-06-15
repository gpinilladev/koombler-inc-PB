import { Component, OnInit, HostListener, ViewChild, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, Inject } from '@angular/core';
import { 
  NbLoginComponent, 
  NbAuthJWTToken, 
  NbAuthResult, 
  NbAuthService, 
  NB_AUTH_OPTIONS, 
  NbAuthSocialLink, 
  getDeepFromObject 
} from '@nebular/auth';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { UtilitiesService } from '../../../services/utilities.service';
import { DocumentTypeService } from '../../../services/document-type.service';
import { ProfileService } from '../../../services/profile.service';
import { SpecialtyService } from '../../../services/specialty.service';
import { UserSpecialityService } from '../../../services/user-speciality.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'ngx-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {

  @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;
  @HostListener('window:scroll')
  onScrollEvent() {
    this.datepicker.hide();
  }
  colorTheme: string = 'theme-dark-blue';
  bsConfig: Partial<BsDatepickerConfig>;

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  userSpecialist: boolean = false;

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  socialLinks: NbAuthSocialLink[] = [];

  selectedCar: number;
  documentTypes = [
    // { id: 1, name: 'CC - Cédula de ciudadania' },
    // { id: 2, name: 'CE - Cedula de extrangeria' },
    // { id: 3, name: 'PA - Pasaporte' },
    // { id: 4, name: 'RC - Registro civil' },
    // { id: 5, name: 'TI - Tarjeta de identidad' },
  ];
  userProfiles = [
    // { id: 1, name: 'UC - Usuario cliente' },
    // { id: 2, name: 'UE - Usuario especialista' },
  ];
  userSpecialties = [
    // { id: 1, name: 'Derecho Tributario' },
    // { id: 2, name: 'Derecho administrativo' },
    // { id: 3, name: 'Derecho Familiar' },
    // { id: 4, name: 'Derecho Comercial' },
    // { id: 5, name: 'Derecho Ambiental y territorial' },
    // { id: 6, name: 'Derecho de Sociedades' },
    // { id: 7, name: 'Derecho del Transporte' },
    // { id: 8, name: 'Derecho de los Negocios Internacionales' },
  ];
  
  constructor(
    private utilitiesService: UtilitiesService,
    private documentTypeService: DocumentTypeService,
    private profileService: ProfileService,
    private specialtyService: SpecialtyService,
    private userSpecialityService: UserSpecialityService,
    private authService: AuthService,
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router
  ) {}

  ngOnInit(): void {

    const self = this;

    self.user = new User('', '', '', '', '', '', '', '', '', '', null);
    self.redirectDelay = self.getConfigValue('forms.register.redirectDelay');
    self.showMessages = self.getConfigValue('forms.register.showMessages');
    self.strategy = self.getConfigValue('forms.register.strategy');
    self.socialLinks = self.getConfigValue('forms.login.socialLinks');
    self.bsConfig = Object.assign({}, { containerClass: self.colorTheme, isAnimated: true, dateInputFormat: 'DD-MM-YYYY' });
    
    self.documentTypeService.fnHttpGetListDocumentTypes().subscribe(resp => {
      self.documentTypes = resp.body['tipoIdentificacion'];
    });

    self.profileService.fnHttpGetProfilesList().subscribe(resp => {
      let userProfiles = JSON.parse(JSON.stringify(resp.body['perfil']));
      self.userProfiles = userProfiles;
    });

    self.specialtyService.fnHttpGetSpecialtiesList().subscribe(resp => {
      self.userSpecialties = resp.body['especialidad'];
    });
    
  }

  register(signUpForm: any): void {
    this.errors = this.messages = [];
    this.submitted = true;
    // this.user
    let idState = '60b290c9084ecb101b56809e';
    let dataObjectSend = {
      idEstado: idState,
      idPerfil: this.user['idPerfil'],
      nombres: this.user['nombres'],
      apellidos: this.user['apellidos'],
      telefono: this.user['telefono'],
      direccion: this.user['direccion'],
      tipoIdentificacion: this.user['tipoIdentificacion'],
      numIdentificacion: this.user['numIdentificacion'],
      email: this.user['email'],
      fechaNacimiento: 1622620432000,
      clave: this.user['confirmaClave'],
    };
    
    this.authService.fnHttpSignUpUser(dataObjectSend).subscribe((result: NbAuthResult) => {
      if (result['status'] === 200) {
        this.utilitiesService.showToast('top-right', 'success', 'Te has registrado satisfactoriamente!');
        let idUser = result['body']['usuario']['_id'];
        this.fnSaveSpecialitiesUser(idUser, idState, this.user['specialities']);
      } else {
        this.utilitiesService.showToast('top-right', 'warning', 'Ha ocurrido un error, intentalo nuevamente!');
      }
      setTimeout(() => {
        return this.router.navigateByUrl('auth/login');
      }, 3000);
    }, error => {
      this.utilitiesService.showToast('top-right', 'danger', 'Ha ocurrido un error, intentalo nuevamente!');
    });
    this.cd.detectChanges();
  }

  fnSaveSpecialitiesUser(idUser: string, idState: string, collection: []): any {
    if (collection.length < 1) {
      return;
    } else {
      collection.forEach(element =>  {
        let objectData = null;
        objectData = {
          idUsuario: idUser,
          idEspecialidad: element,
          idEstado: idState,
        }
        this.userSpecialityService.fnHttpCreateSpecialityByUser(objectData).subscribe((resp) => {});
      });
    }
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  fnValidTypeUser($event) {
    if ($event.nombre == "Especialista") {
      this.userSpecialist = true;
    } else {
      this.userSpecialist = false;
      this.user['specialities'] = '';
    }
  }

}
