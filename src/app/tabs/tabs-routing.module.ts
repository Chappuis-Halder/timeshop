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
            path: 'reserve',
            loadChildren: () => import('../reservation/reservation.module').then((m) => m.ReservationPageModule),
          },
        ],
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
