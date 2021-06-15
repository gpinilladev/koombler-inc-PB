import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { BaseComponent } from './base/base.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { UserComponent } from "./user/user.component";
import { ProfileComponent } from './profile/profile.component';
import { UserSpecialityComponent } from './user-speciality/user-speciality.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { UserComponent } from "./user/user.component";
import { UserSpecialityComponent } from './user-speciality/user-speciality.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'base',
      component: BaseComponent,
    },
    {
      path: 'document-type',
      component: DocumentTypeComponent,
    },
    {
      path: 'solicitud',
      component: SolicitudComponent,
    },
    {
      path: 'user',
      component: UserComponent,
    },
    {
      path:'user-speciality',
      component:UserSpecialityComponent,
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path: 'specialty',
      component: SpecialtyComponent,
    },
    {
      path: 'solicitud',
      component: SolicitudComponent,
    },
    {
      path: 'user',
      component: UserComponent,
    },
    {
      path:'user-speciality',
      component:UserSpecialityComponent
    },
    // {
    //   path: 'base',
    //   loadChildren: () => import('./base/base.module')
    //     .then(m => m.BaseModule),
    // },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
