import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';

import { SignInComponent } from './sign-in/sign-in.component';

// export const routes: Routes = [
//   {
//     path: 'auth',
//     loadChildren: './auth/auth.module#NgxAuthModule',
//     children: [
//       {
//         path: 'login',
//         component: SignInComponent, // <---
//       },
//     ],
//   },
// ];

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: SignInComponent, // <---
      }, 
      // {
      //   path: 'sign-up',
      //   component: NgxRegisterComponent, // <---
      // }, {
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