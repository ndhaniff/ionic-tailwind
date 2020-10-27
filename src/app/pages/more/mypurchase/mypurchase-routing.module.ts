import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MypurchasePage } from './mypurchase.page';

const routes: Routes = [
  {
    path: '',
    component: MypurchasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypurchasePageRoutingModule {}
