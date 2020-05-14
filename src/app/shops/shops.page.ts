import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, icon } from 'leaflet';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shops',
  templateUrl: 'shops.page.html',
  styleUrls: ['shops.page.scss'],
})
export class ShopsPage {
  constructor(private readonly cdr: ChangeDetectorRef) {}
  map: Map;
  shopsArray: any[] = [
    {
      id: 1,
      Name: 'Shop 1',
      latlng: [47.6, 19],
    },
    {
      id: 2,
      Name: 'Shop 2',
      latlng: [47.7, 19],
    },
    {
      id: 3,
      Name: 'Shop 3',
      latlng: [47.6, 19.1],
    },
  ];

  ionViewDidEnter() {
    this.leafletMap();
  }

  leafletMap() {
    // In setView add latLng and zoom
    this.map = new Map('mapId').setView([47.4979, 19.0402], 10);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://chappuishalder.com">Chappuis Halder Lab</a> contributors',
    }).addTo(this.map);

    //marker([47.4, 19]).addTo(this.map).bindPopup('Shop 1').openPopup();

    marker([47.6, 19]).on('click', this.onMarkerClick).addTo(this.map).bindPopup('Shop 2');

    marker([47.6, 19.1]).on('click', this.onMarkerClick).addTo(this.map).bindPopup('Shop 3');

    /*     var myIcon = icon({
      iconUrl: 'leaflet/leaf-green.png',
      shadowUrl: 'leaflet/leaf-shadow.png',

      iconSize: [38, 95], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
     marker([47.4, 19], { icon: myIcon }).addTo(this.map); */
  }
  onMarkerClick(e) {
    console.log(e);
  }
  onSelectChange(e) {
    console.log(e);
  }

  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }
}
