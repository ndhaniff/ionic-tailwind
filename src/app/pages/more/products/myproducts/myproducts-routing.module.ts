import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyproductsPage } from './myproducts.page';

const routes: Routes = [
  {
    path: '',
    component: MyproductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyproductsPageRoutingModule {}
