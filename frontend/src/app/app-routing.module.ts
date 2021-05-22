import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SignInComponent } from './pages/auth_/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth_/sign-up/sign-up.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HeaderComponent } from './common/components/header/header.component';
import { SidebarComponent } from './common/components/sidebar/sidebar.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '', // http://localhost:4200/
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home', // http://localhost:4200/login
    pathMatch: 'full',
    component: LandingPageComponent,
  },
  {
    path: 'login', // http://localhost:4200/login
    pathMatch: 'full',
    component: SignInComponent,
  },
  {
    path: 'signup', // http://localhost:4200/signup
    pathMatch: 'full',
    component: SignUpComponent,
  },
  {
    path: 'dashboard', // http://localhost:4200/dashboard
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
