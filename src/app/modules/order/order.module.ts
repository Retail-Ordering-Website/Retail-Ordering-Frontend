import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    OrderSummaryComponent,
    OrderSuccessComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
