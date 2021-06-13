import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { BaseModule } from './base/base.module';
import { DocumentTypeModule } from './document-type/document-type.module';
import { ProfileModule } from './profile/profile.module';
import { StatePipe } from '../pipes/state.pipe';
import { UserModule } from "./user/user.module";

import {UserSpecialityModule} from './user-speciality/user-speciality.module'

@NgModule({
  imports: [
    // BrowserAnimationsModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    // Custom modules
    BaseModule,
    DocumentTypeModule,
    UserModule,
    UserSpecialityModule,
    // ProfileModule,
  ],
  declarations: [
    PagesComponent,

    // AddDocumentTypeComponent,
    // DocumentTypeComponent,
    // BaseComponent,
    // SignInComponent,
    // StatePipe,
  ],
  // exports: [
  //   StatePipe,
  // ],
  // entryComponents: [
  //   StatePipe,
  // ],
})
export class PagesModule {
}
