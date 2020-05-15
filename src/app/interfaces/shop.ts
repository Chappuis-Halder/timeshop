import { CalendarEvent } from 'angular-calendar';

export interface Shop {
  id: number;
  name: string;
  reservations: Array<CalendarEvent>;
  address: string;
  latitude: number;
  longitude: number;
  peakHours: string;
}
