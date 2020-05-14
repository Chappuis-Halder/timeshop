import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationPage } from './reservation.page';
import { ReservationPageRoutingModule } from './reservation-routing.module';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ReservationPageRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [ReservationPage, ReservationDetailsComponent],
  entryComponents: [ReservationDetailsComponent],
})
export class ReservationPageModule {}
