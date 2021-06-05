import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbInputModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
// import { DashboardComponent } from '../dashboard/dashboard.component';
// import { StatusCardComponent } from '../dashboard/status-card/status-card.component';
// import { ContactsComponent } from '../dashboard/contacts/contacts.component';
// import { RoomsComponent } from '../dashboard/rooms/rooms.component';
// import { RoomSelectorComponent } from '../dashboard/rooms/room-selector/room-selector.component';
// import { TemperatureComponent } from '../dashboard/temperature/temperature.component';
// import { TemperatureDraggerComponent } from '../dashboard/temperature/temperature-dragger/temperature-dragger.component';
// import { KittenComponent } from '../dashboard/kitten/kitten.component';
// import { SecurityCamerasComponent } from '../dashboard/security-cameras/security-cameras.component';
// import { ElectricityComponent } from '../dashboard/electricity/electricity.component';
// import { ElectricityChartComponent } from '../dashboard/electricity/electricity-chart/electricity-chart.component';
// import { WeatherComponent } from '../dashboard/weather/weather.component';
// import { SolarComponent } from '../dashboard/solar/solar.component';
// import { PlayerComponent } from '../dashboard/rooms/player/player.component';
// import { TrafficComponent } from '../dashboard/traffic/traffic.component';
// import { TrafficChartComponent } from '../dashboard/traffic/traffic-chart.component';
import { FormsModule } from '@angular/forms';

import { BaseComponent } from './base.component';
import { AddComponent } from './add/add.component';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NgxEchartsModule,
    NbInputModule,
  ],
  declarations: [
    BaseComponent,
    AddComponent,
    // DashboardComponent,
    // StatusCardComponent,
    // TemperatureDraggerComponent,
    // ContactsComponent,
    // RoomSelectorComponent,
    // TemperatureComponent,
    // RoomsComponent,
    // KittenComponent,
    // SecurityCamerasComponent,
    // ElectricityComponent,
    // ElectricityChartComponent,
    // WeatherComponent,
    // PlayerComponent,
    // SolarComponent,
    // TrafficComponent,
    // TrafficChartComponent,
  ],
})
export class BaseModule { }
