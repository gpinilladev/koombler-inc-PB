import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { 
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule
} from '@nebular/theme';
import { SignInComponent } from './sign-in/sign-in.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbAuthModule,
  ],
  declarations: [
    // ... here goes our new components
    SignInComponent,
  ],
})
export class NgxAuthModule {
}