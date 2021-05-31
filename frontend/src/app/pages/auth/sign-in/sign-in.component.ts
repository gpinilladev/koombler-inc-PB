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

    self.service.authenticate(self.strategy, self.user).subscribe((result: NbAuthResult) => {
      console.log('result: ', result);
      if (result.isSuccess()) {
        console.log('result.isSuccess(): ', result.isSuccess());
        console.log('result.getMessages(): ', result.getMessages());
        console.log('result.getRedirect(): ', result.getRedirect());
        if (result['response']['status'] == 200){
          const redirect = result.getRedirect();
          console.log('redirect: ', redirect);
          self.router.navigateByUrl(redirect);
        }
        if (result['response']['status'] == 206) {
          self.submitted = false;
          // let message = result.getMessages()[0]['body']["message"];
          // self.utilitiesService.showToast('top-right', 'warning', message);
        }
      } else {
        if (result.getErrors()[0]['status'] == 500) {
          self.submitted = false;
        }
      }
      self.cd.detectChanges();
      // console.log('result: ', result);
      // console.log('result.isSuccess(): ', result.isSuccess());
      // this.submitted = false;

      // if (result.isSuccess()) {
      //   this.messages = result.getMessages();
      // } else {
      //   this.errors = result.getErrors();
      // }

      // const redirect = result.getRedirect();
      // console.log('redirect: ', redirect);
      // if (redirect) {
      //   setTimeout(() => {
      //     return this.router.navigateByUrl(redirect);
      //   }, 
      //   // this.redirectDelay
      //   1000
      //   );
      // }
      // this.cd.detectChanges();
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}
