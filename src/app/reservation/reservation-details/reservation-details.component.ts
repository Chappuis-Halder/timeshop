import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';

import { CalendarEvent } from 'angular-calendar';
import { EVENT_COLORS } from '../event-color';
import { Shop } from 'src/app/interfaces/shop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
})
export class ReservationDetailsComponent implements OnInit {
  @Input() shop: Shop;
  @Input() selectedSlotStart: Date;
  @Input() selectedSlotEnd: Date;
  public reservationForm: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private readonly modalController: ModalController,
    private readonly loadingController: LoadingController
  ) {
    this.reservationForm = formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });
  }

  ngOnInit() {}

  dismissModal(data?: any) {
    this.modalController.dismiss(data);
  }

  async submit() {
    Object.keys(this.reservationForm.controls).forEach((key) => {
      this.reservationForm.get(key).markAsDirty();
      this.reservationForm.get(key).updateValueAndValidity();
    });
    if (this.reservationForm.valid) {
      const loader = await this.loadingController.create({
        message: 'Reserving Your Place',
      });
      await loader.present();
      const event: CalendarEvent = {
        title: `Your reservation - ${this.reservationForm.get('name').value}`,
        start: this.selectedSlotStart,
        end: this.selectedSlotEnd,
        color: EVENT_COLORS.success,
        cssClass: 'white-event-text',
      };

      setTimeout(async () => {
        await loader.dismiss();
        this.dismissModal(event);
      }, 1900);
    }
  }
}
