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

import { DocumentTypeComponent } from './document-type.component';
import { AddDocumentTypeComponent } from './add-document-type/add-document-type.component';
import { EditDocumentTypeComponent } from './edit-document-type/edit-document-type.component';
import { DeleteDocumentTypeComponent } from './delete-document-type/delete-document-type.component';


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
    DocumentTypeComponent,
    AddDocumentTypeComponent,
    EditDocumentTypeComponent,
    DeleteDocumentTypeComponent,
    // StatePipe,
  ],
  // exports: [
  //   StatePipe,
  // ],
  // entryComponents: [
  //   StatePipe,
  // ],
})
export class DocumentTypeModule { }
