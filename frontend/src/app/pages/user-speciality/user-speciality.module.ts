import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbInputModule,
} from '@nebular/theme';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';

import { StatePipe } from '../../pipes/state.pipe';

import { CommonModule } from '@angular/common';
import { UserSpecialityComponent } from './user-speciality.component';
import { AddUserSpecialityComponent } from './add-user-speciality/add-user-speciality.component';
import { DeleteUserSpecialityComponent } from './delete-user-speciality/delete-user-speciality.component';
import { EditUserSpecialityComponent } from './edit-user-speciality/edit-user-speciality.component';

@NgModule({
  declarations: [
    UserSpecialityComponent,
    AddUserSpecialityComponent,
    DeleteUserSpecialityComponent,
    EditUserSpecialityComponent,
  ],
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NgxEchartsModule,
    NbInputModule,
    NgxPaginationModule,
    NgSelectModule,
  ]
})
export class UserSpecialityModule { }
