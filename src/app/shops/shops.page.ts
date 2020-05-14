import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { LeafletMouseEvent, Map, marker, tileLayer } from 'leaflet';

import { Router } from '@angular/router';
import { Shop } from '../interfaces/shop';
import { ShopService } from '../services/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shops',
  templateUrl: 'shops.page.html',
  styleUrls: ['shops.page.scss'],
})
export class ShopsPage {
  @ViewChild('leafletMap', { static: true }) leafletMap: ElementRef;
  private readonly shops: Array<Shop>;
  private map: Map;

  constructor(private readonly cdr: ChangeDetectorRef, private readonly shopService: ShopService, private readonly router: Router) {
    this.shops = this.shopService.getShops();
  }

  ionViewDidEnter() {
    this.renderMap();
  }

  /** Render Leaflet map */
  renderMap() {
    this.map = new Map(this.leafletMap.nativeElement, { attributionControl: false, zoomControl: false });
    this.map.setView([47.4979, 19.0402], 10);
    const tile = tileLayer(environment.mapTileUrl, {
      minZoom: 10,
      minNativeZoom: 10,
      updateWhenZooming: true,
    });
    tile.addTo(this.map);
    this.shops.forEach((shop) => {
      const m = marker([shop.latitude, shop.longitude]);
      m.on('click', (event: LeafletMouseEvent) => {
        this.onMarkerClick(event);
      });
      m.bindTooltip(shop.name, { permanent: true });
      m.addTo(this.map);
    });
  }

  onMarkerClick($event: LeafletMouseEvent) {
    const shop = this.shopService.findShopByLocation($event.latlng.lat, $event.latlng.lng);
    if (shop) {
      this.router.navigate(['/timeshop/shop/reserve', shop.id]);
      this.cdr.detectChanges();
    }
  }

  onSelectedShop($event) {
    this.router.navigate(['/timeshop/shop/reserve', +$event.detail.value]);
    this.cdr.detectChanges();
  }

  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }
}
