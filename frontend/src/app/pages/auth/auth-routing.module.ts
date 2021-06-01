import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: SignInComponent, // <---
      }, 
      {
        path: 'sign-up',
        component: SignUpComponent, // <---
      }, 
      // {
      //   path: 'request-password',
      //   component: NgxRequestPasswordComponent, // <---
      // }, {
      //   path: 'activate-account',
      //   component: ActivateAccountComponent, // <---
      // }, {
      //   path: 'update-password',
      //   component: UpdatePasswordComponent, // <---
      // }, {
      //   path: 'log-out',
      //   component: LogoutComponent, // <---
      // }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}