import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbDialogService } from '@nebular/theme';
import { StateService } from '../../services/state.service';
import { AddStateComponent } from './add-state/add-state.component';
import {EditStateComponent} from './edit-state/edit-state.component'

@Component({
  selector: 'ngx-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnDestroy, OnInit {

  public collectionState: any = [];
  public numItemsPage: number = 5;
  public currentPage: number = 1;

  constructor(
    private themeService: NbThemeService,
    private dialogService: NbDialogService,
    private stateService: StateService,
  ) { }

  ngOnInit(): void {
    this.fnGetListStateOne();
  }

  fnGetListStateOne() {
    this.stateService.fnHttpGetListState().subscribe(resp => {
      console.log('resp: ', resp);
      this.collectionState = resp['body']['estado'];
      console.log('this.collectionState: ', this.collectionState);
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
    this.dialogService.open(AddStateComponent, { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        console.log('res: ', res);
        this.fnGetListStateOne();
      }
    });
  }
  fnShowEdit(dataItem){
    let object_send = {};
    let dataObject =dataItem;
    object_send['dataObject'] = dataObject;
     this.dialogService.open(EditStateComponent, { context: object_send }).onClose.subscribe((res) => {
       if(res) {
        this.fnGetListStateOne();  
       }
     });

  }
  

 /* fnShowEdit(dataItem) {
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
  }*/


  ngOnDestroy() {
  }

}
