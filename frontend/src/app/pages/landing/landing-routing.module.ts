import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { LandingComponent } from '../landing/landing.component';
import {QuienesSomosComponent} from '../quienes-somos/quienes-somos.component'

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
{
path:'somos',
component: QuienesSomosComponent
},

{
  path:'contactenos',
  component: ContactUsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule { }
