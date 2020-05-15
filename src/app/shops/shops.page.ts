import * as L from 'leaflet';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';

import { LoadingController } from '@ionic/angular';
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
  public selectedShop: Shop;

  public shops: Array<Shop>;
  private map: L.Map;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly shopService: ShopService,
    private readonly router: Router,
    private readonly loadingController: LoadingController
  ) {
    this.shops = this.shopService.getShops();
  }

  ionViewDidEnter() {
    this.renderMap();
  }

  /** Render Leaflet map */
  renderMap() {
    this.map = new L.Map(this.leafletMap.nativeElement, { attributionControl: false, zoomControl: false });
    this.map.setView([47.4979, 19.0402], 10);
    const tile = L.tileLayer(environment.mapTileUrl, {
      minZoom: 10,
      minNativeZoom: 10,
      updateWhenZooming: true,
    });
    const markerIcon = new L.Icon({
      iconUrl: 'assets/marker.svg',
      iconSize: [48, 48],
      iconAnchor: [24, 36],
      popupAnchor: [0, 0],
      tooltipAnchor: [15, -16],
    });
    tile.addTo(this.map);
    this.shops.forEach((shop) => {
      const marker = L.marker([shop.latitude, shop.longitude], { icon: markerIcon });
      marker.on('click', (event: L.LeafletMouseEvent) => {
        this.onMarkerClick(event);
      });
      marker.bindTooltip(`${shop.name}<br>${shop.address}<br>Peak Hours: ${shop.peakHours}`, { permanent: true });
      marker.addTo(this.map);
    });
  }

  onMarkerClick($event: L.LeafletMouseEvent) {
    const shop = this.shopService.findShopByLocation($event.latlng.lat, $event.latlng.lng);
    if (shop) {
      this.reserveShop(shop);
    }
  }

  async reserveShop(shop: Shop) {
    const loader = await this.loadingController.create({ message: 'Loading Reservations' });
    await loader.present();
    this.map.setView({ lat: shop.latitude, lng: shop.longitude }, this.map.getZoom(), {
      animate: true,
      duration: 0.4,
    });
    setTimeout(() => {
      this.router.navigate(['/app/shop/reserve', shop.id]);
      loader.dismiss();
    }, 400);
  }

  onSelectedShop($event: Shop) {
    this.reserveShop($event);
  }

  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }
}
