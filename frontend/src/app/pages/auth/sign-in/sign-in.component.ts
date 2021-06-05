import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, Inject } from '@angular/core';
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

import { UtilitiesService } from '../../../services/utilities.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'ngx-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent extends NbLoginComponent implements OnInit {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];
  rememberMe = false;


  constructor(
    private utilitiesService: UtilitiesService,
    private authService: AuthService,
    protected service: NbAuthService,
    protected cd: ChangeDetectorRef,
    protected dialogService: NbDialogService,
    @Inject(NB_AUTH_OPTIONS) options: {},
    protected router: Router
  ) {
      super(service, options, cd, router);
  }

  ngOnInit(): void {
    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    this.rememberMe = this.getConfigValue('forms.login.rememberMe');
  }

  login(): void {
    const self = this;
    self.errors = [];
    self.messages = [];
    self.submitted = true;
    self.user['getToken'] = true;

    // this.authService.fnHttpSignInUser(self.user).subscribe((result: NbAuthResult) => {
    //   if (result['status'] === 200) {
    //     this.utilitiesService.showToast('top-right', 'success', 'Has ingresado satisfactoriamente!');
    //     setTimeout(() => {
    //       return this.router.navigateByUrl('pages/dashboard');
    //     }, 100);
    //   } else {
    //     this.utilitiesService.showToast('top-right', 'warning', 'Ha ocurrido un error, intentalo nuevamente!');
    //   }
    //   setTimeout(() => {
    //     return this.router.navigateByUrl('auth/login');
    //   }, 3000);
    // }, error => {
    //   this.utilitiesService.showToast('top-right', 'danger', 'Ha ocurrido un error, intentalo nuevamente!');
    // });
    // this.cd.detectChanges();

    self.service.authenticate(self.strategy, self.user).subscribe((result: NbAuthResult) => {
      console.log('result: ', result);
      if (result.isSuccess()) {
        if (result['response']['status'] == 200){
          localStorage.setItem('userData', JSON.stringify(result['response']['body']['usuario']));
          const redirect = result.getRedirect();
          self.router.navigateByUrl(redirect);
        }
        if (result['response']['status'] == 206) {
          self.submitted = false;
          this.utilitiesService.showToast('top-right', 'danger', 'Ha ocurrido un error, intentalo nuevamente!');
        }
      } else {
        if (result.getErrors()[0]['status'] == 500) {
          self.submitted = false;
          this.utilitiesService.showToast('top-right', 'danger', 'Ha ocurrido un error, intentalo nuevamente!');
        }
      }
      self.cd.detectChanges();
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}
