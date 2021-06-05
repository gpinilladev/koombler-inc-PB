import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS, MENU_USERS, MENU_ADMINS, MENU_PROFESSIONALS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  idProfile: string = JSON.parse(localStorage.getItem('userData'))['idPerfil'];
  menu: any = [];

  constructor() {}
  ngOnInit() {
    this.menu = (this.idProfile == "60b59445f2167c0fd787310f") ? MENU_ADMINS : (this.idProfile == "60b5a83d9a8b7114d5d631d9") ? MENU_PROFESSIONALS : MENU_USERS;
    // this.menu = MENU_ITEMS;
  }

}
