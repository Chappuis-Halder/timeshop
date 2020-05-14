import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'timeshop',
    component: TabsPage,
    children: [
      {
        path: 'shop',
        children: [
          {
            path: '',
            loadChildren: () => import('../shops/shops.module').then((m) => m.ShopsPageModule),
          },
          {
            path: 'reserve/:id',
            loadChildren: () => import('../reservation/reservation.module').then((m) => m.ReservationPageModule),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/timeshop/shop',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/timeshop/shop',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/timeshop/shop' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
