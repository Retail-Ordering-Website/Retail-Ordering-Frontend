import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: 'success', component: OrderSuccessComponent },
  { path: 'admin-summary', component: OrderSummaryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
