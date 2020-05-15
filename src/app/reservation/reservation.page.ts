import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { addMinutes, getHours, setHours, setMinutes } from 'date-fns';

import { CalendarEvent } from 'angular-calendar';
import { EVENT_COLORS } from './event-color';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { Shop } from '../interfaces/shop';
import { ShopService } from '../services/shop.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit, OnDestroy {
  public shop: Shop;
  public viewDate: Date;
  public dayStartHour: number;
  public dayEndHour: number;
  public events: Array<CalendarEvent>;
  public refreshCalendar: Subject<any>;

  private routeParamsSubscription: Subscription;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute,
    private readonly shopService: ShopService,
    private readonly router: Router,
    private readonly toastController: ToastController,
    private readonly modalController: ModalController
  ) {
    this.viewDate = new Date();
    this.dayStartHour = 8;
    this.dayEndHour = 22;
    this.events = [this.getPastEvent()];
    this.refreshCalendar = new Subject<any>();
  }

  ngOnInit(): void {
    this.routeParamsSubscription = this.subscribeToRouteParams();
  }

  ngOnDestroy(): void {
    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe();
    }
  }

  public async appointmentSelected(selectedSlot) {
    const modal = await this.modalController.create({
      component: ReservationDetailsComponent,
      componentProps: {
        shop: this.shop,
        selectedSlotStart: selectedSlot.date,
        selectedSlotEnd: addMinutes(selectedSlot.date, 30),
      },
      keyboardClose: false,
      swipeToClose: false,
    });
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.events.push(result.data);
        this.shopService.addEventToLocation(this.shop.id, result.data);
        this.refreshCalendar.next();
        this.cdr.detectChanges();
      }
    });
    await modal.present();
  }

  private subscribeToRouteParams() {
    return this.activatedRoute.paramMap.subscribe(async (params: ParamMap) => {
      const shopId = +params.get('id');
      const shop = this.shopService.getShop(shopId);
      if (!shop) {
        const toast = await this.toastController.create({ message: 'Shop Not Found', duration: 4000 });
        await toast.present();
        this.router.navigate(['/app/shop']);
      }
      this.shop = shop;
      this.events = this.events.concat(this.shop.reservations);
      this.cdr.detectChanges();
    });
  }

  private getPastEvent(): CalendarEvent {
    const currentHour = getHours(this.viewDate);
    return {
      title: 'Unavailable',
      start: setHours(setMinutes(this.viewDate, 0), this.dayStartHour),
      end: setHours(setMinutes(this.viewDate, 59), currentHour),
      color: EVENT_COLORS.disabled,
      cssClass: 'grey-event-text',
    };
  }
}
