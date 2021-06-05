import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbDialogService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';

import { AddComponent } from './add/add.component';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnDestroy, OnInit {

  private alive = true;

  solarValue: number;
  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'info',
      },
    ],
    dark: this.commonStatusCardsSet,
  };

  constructor(
    private themeService: NbThemeService,
    private solarService: SolarData,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit() {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
    });
  }

  fnShowCreate() {
    let object_send = {};
    let dataObject = {
      'datoenvio': 'Algun dato',
    }
    object_send['dataObject'] = dataObject;
    this.dialogService.open(AddComponent, { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        console.log('res: ', res);
      }
    });
  }

  fnShowEdit() {
    let object_send = {};
    let dataObject = {
      'datoenvio': 'Algun dato',
    }
    object_send['dataObject'] = dataObject;
    this.dialogService.open(AddComponent, { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        console.log('res: ', res);
      }
    });
  }

  fnShowDelete() {
    let object_send = {};
    let dataObject = {
      'datoenvio': 'Algun dato',
    }
    object_send['dataObject'] = dataObject;
    this.dialogService.open(AddComponent, { context: object_send }).onClose.subscribe((res) => {
      if(res) {
        console.log('res: ', res);
      }
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
