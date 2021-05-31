import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuard], // here we tell Angular to check the access with our AuthGuard
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.NgxAuthModule),
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
