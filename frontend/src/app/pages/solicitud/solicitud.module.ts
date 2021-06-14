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
import { SolicitudComponent } from './solicitud.component';
import { AddSolicitudComponent  } from "./add-solicitud/add-solicitud.component";
import { EditSolicitudComponent } from './edit-solicitud/edit-solicitud.component';
import { DeleteSolicitudComponent } from './delete-solicitud/delete-solicitud.component';



@NgModule({
  declarations: [
    SolicitudComponent,
    AddSolicitudComponent,
    EditSolicitudComponent,
    DeleteSolicitudComponent
  ],
  imports: [
    CommonModule,
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
export class SolicitudModule { }
