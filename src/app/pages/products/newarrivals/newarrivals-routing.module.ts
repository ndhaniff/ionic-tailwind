import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewarrivalsPage } from './newarrivals.page';

const routes: Routes = [
  {
    path: '',
    component: NewarrivalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewarrivalsPageRoutingModule {}
