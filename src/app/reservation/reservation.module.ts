import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ReservationPage } from './reservation.page';
import { ReservationPageRoutingModule } from './reservation-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReservationPageRoutingModule],
  declarations: [ReservationPage],
})
export class ReservationPageModule {}
