import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ShopsPage } from './shops.page';

const routes: Routes = [
  {
    path: '',
    component: ShopsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopsPageRoutingModule {}
