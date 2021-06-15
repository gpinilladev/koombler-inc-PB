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

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';

import { StateComponent } from './state.component';
import { AddStateComponent } from './add-state/add-state.component';
import { EditStateComponent } from './edit-state/edit-state.component';


@NgModule({
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
  ],
  declarations: [
    StateComponent,
    AddStateComponent,
    EditStateComponent,
  ],
})


export class StateModule { }
