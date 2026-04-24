import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './components/offers/offers.component';
import { ApplyCouponComponent } from './components/apply-coupon/apply-coupon.component';



@NgModule({
  declarations: [
    OffersComponent,
    ApplyCouponComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PromotionModule { }
