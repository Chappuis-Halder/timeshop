import { addDays, eachDayOfInterval, setHours, setMinutes, startOfDay } from 'date-fns';

import { CalendarEvent } from 'angular-calendar';
import { EVENT_COLORS } from '../reservation/event-color';
import { Injectable } from '@angular/core';
import { Shop } from '../interfaces/shop';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private shops: Array<Shop>;

  public getShop(id: number): Shop {
    return this.shops.filter((shop) => shop.id === id)[0];
  }

  public getShops(): Array<Shop> {
    return this.shops;
  }

  public findShopByLocation(latitude: number, longitude: number): Shop {
    return this.shops.filter((shop) => shop.latitude === latitude && shop.longitude === longitude)[0];
  }

  public addEventToLocation(id: number, event: CalendarEvent) {
    this.getShop(id).reservations.push(event);
  }

  constructor() {
    this.shops = [
      {
        id: 1,
        name: 'Shop 1',
        address: '430  Hamill Avenue, Weybridge, Vermont',
        reservations: this.generateReservations(),
        latitude: 47.6,
        longitude: 19,
        peakHours: '10AM - 14PM',
      },
      {
        id: 2,
        name: 'Shop 2',
        address: '1460  Michael Street, Houston, Texas',
        reservations: this.generateReservations(),
        latitude: 47.7,
        longitude: 19,
        peakHours: '12AM - 13PM',
      },
      {
        id: 3,
        name: 'Shop 3',
        address: '4316  Mount Street, Saginaw, Michigan',
        reservations: this.generateReservations(),
        latitude: 47.5133537,
        longitude: 19.046117,
        peakHours: '16PM - 17PM',
      },
    ];
  }

  private generateReservations(): Array<CalendarEvent> {
    const hours = Array.from({ length: 15 }, (v, k) => k + 8);
    const now = new Date();
    const events = [] as Array<CalendarEvent>;
    const nextSevenDays = eachDayOfInterval({
      start: addDays(startOfDay(now), 1),
      end: addDays(now, 6),
    });

    nextSevenDays.forEach((date) => {
      const eventCount = Math.floor(Math.random() * Math.floor(7));
      const eventHours = hours.sort(() => 0.5 - Math.random()).slice(0, eventCount);
      eventHours.forEach((hour: number) => {
        events.push({
          title: 'Reserved',
          start: setHours(setMinutes(date, 0), hour),
          end: setHours(setMinutes(date, 30), hour),
          color: EVENT_COLORS.reserved,
          cssClass: 'white-event-text',
        });
      });
    });

    return events;
  }
}
