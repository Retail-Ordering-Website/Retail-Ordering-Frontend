import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoyaltyPointsComponent } from './components/loyalty-points/loyalty-points.component';

const routes: Routes = [
  { path: '', component: LoyaltyPointsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoyaltyRoutingModule { }
