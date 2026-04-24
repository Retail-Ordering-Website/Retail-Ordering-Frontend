import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
