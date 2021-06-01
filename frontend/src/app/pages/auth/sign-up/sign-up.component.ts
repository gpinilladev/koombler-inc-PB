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
    { id: 1, name: 'CC - Cédula de ciudadania' },
    { id: 2, name: 'CE - Cedula de extrangeria' },
    { id: 3, name: 'PA - Pasaporte' },
    { id: 4, name: 'RC - Registro civil' },
    { id: 5, name: 'TI - Tarjeta de identidad' },
  ];
  userProfiles = [
    { id: 1, name: 'UC - Usuario cliente' },
    { id: 2, name: 'UE - Usuario especialista' },
  ];
  userSpecialities = [
    { id: 1, name: 'Derecho Tributario' },
    { id: 2, name: 'Derecho administrativo' },
    { id: 3, name: 'Derecho Familiar' },
    { id: 4, name: 'Derecho Comercial' },
    { id: 5, name: 'Derecho Ambiental y territorial' },
    { id: 6, name: 'Derecho de Sociedades' },
    { id: 7, name: 'Derecho del Transporte' },
    { id: 8, name: 'Derecho de los Negocios Internacionales' },
  ];
  
  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.user = new User('', '', '', '', '', '', '', '', '', '', null);
    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.strategy = this.getConfigValue('forms.register.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme, isAnimated: true, dateInputFormat: 'DD-MM-YYYY' });
  }

  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.register(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  fnValidTypeUser($event) {
    console.log('$event: ', $event);
    if ($event.id == 2) {
      this.userSpecialist = true;
    } else {
      this.userSpecialist = false;
      this.user['specialities'] = '';
    }
  }

}
