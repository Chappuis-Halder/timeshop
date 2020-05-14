import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ShopsPage } from './shops.page';
import { ShopsPageRoutingModule } from './shops-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ShopsPageRoutingModule],
  declarations: [ShopsPage],
})
export class ShopsPageModule {}
