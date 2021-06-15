import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NB_WINDOW } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { id: 'myAccount', title: 'Mi cuenta' }, { id: 'logout', title: 'Cerrar sesión' } ];

  constructor(
    private router: Router,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private authService: NbAuthService
  ) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    const hours = new Date().getHours()
    const isDayTime = hours > 6 && hours < 18
    console.log('isDayTime: ', isDayTime);

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      console.log('token: ', token);
      if (token.isValid()) {
        // this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable 
        this.user = JSON.parse(localStorage.getItem('userData'));
        console.log('this.user: ', this.user);
        this.user['name'] = this.user['nombres'] + ' ' + this.user['apellidos'];
        this.user['picture'] = null;
        console.log('this.user: ', this.user);
      }
    });

    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-menu-header'),
        map(({ item: { title } }) => title),
      )
      .subscribe((title) => {
        console.log('title: ', title);
        this.selectOptionMenu(title);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  selectOptionMenu(title) {
    console.log('title: ', title);
    switch (title) {
      case 'Cerrar sesión':
        this.ngOnDestroy();
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigateByUrl('auth/login');
        // this.authService.logout('email').subscribe(resp => {
        //   console.log('resp: ', resp);
        //   this.ngOnDestroy();
        // })
        break;
      case 'Mi cuenta':
        this.router.navigateByUrl('pages/my-account');
        break;
    }
  }
}
