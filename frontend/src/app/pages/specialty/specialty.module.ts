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

import { SpecialtyComponent } from './specialty.component';
import { AddSpecialtyComponent } from './add-specialty/add-specialty.component';
import { EditSpecialtyComponent } from './edit-specialty/edit-specialty.component';
import { DeleteSpecialtyComponent } from './delete-specialty/delete-specialty.component';


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
    NgSelectModule,
  ],
  declarations: [
    SpecialtyComponent,
    AddSpecialtyComponent,
    EditSpecialtyComponent,
    DeleteSpecialtyComponent,
    // StatePipe,
  ],
  // exports: [
  //   StatePipe,
  // ],
  // entryComponents: [
  //   StatePipe,
  // ],
})
export class SpecialtyModule { }
