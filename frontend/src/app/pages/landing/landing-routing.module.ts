import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';
import { LandingComponent } from '../landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    // component: NbAuthComponent,
    children: [
      {
        path: 'index',
        component: LandingComponent, // <---
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule { }
