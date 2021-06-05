import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbDialogService } from '@nebular/theme';
import { DocumentTypeService } from '../../services/document-type.service';
import { AddDocumentTypeComponent } from './add-document-type/add-document-type.component';

@Component({
  selector: 'ngx-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.scss']
})
export class DocumentTypeComponent implements OnDestroy, OnInit {

  public collectionDocumentTypes: any = [];
  public numItemsPage: number = 5;
  public currentPage: number = 1;

  constructor(
    private themeService: NbThemeService,
    private dialogService: NbDialogService,
    private documentTypeService: DocumentTypeService,
  ) { }

  ngOnInit(): void {
    this.fnGetListDocumentType();
  }

  fnGetListDocumentType() {
    this.documentTypeService.fnHttpGetListDocumentTypes().subscribe(resp => {
      console.log('resp: ', resp);
      this.collectionDocumentTypes = resp['body']['tipoIdentificacion'];
      console.log('this.collectionDocumentTypes: ', this.collectionDocumentTypes);
    }, error => {
      console.log('error: ', error);
    })
  }

  fnShowCreate() {
    let object_send = {};
    let dataObject = {
      'datoenvio': 'Algun dato',
    }
    object_send['dataObject'] = dataObject;
    this.dialogService.open(AddDocumentTypeComponent, { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        console.log('res: ', res);
        this.fnGetListDocumentType();
      }
    });
  }

  fnShowEdit(dataItem) {
    let object_send = {};
    let dataObject = {
      'datoenvio': 'Algun dato',
    }
    object_send['dataObject'] = dataObject;
    // this.dialogService.open(AddComponent, { context: object_send }).onClose.subscribe((res) => {
    //   if(res) {
    //     console.log('res: ', res);
    //   }
    // });
  }

  fnShowDelete(dataItem) {
    let object_send = {};
    let dataObject = {
      'datoenvio': 'Algun dato',
    }
    object_send['dataObject'] = dataObject;
    // this.dialogService.open(AddComponent, { context: object_send }).onClose.subscribe((res) => {
    //   if(res) {
    //     console.log('res: ', res);
    //   }
    // });
  }

  ngOnDestroy() {
  }

}
