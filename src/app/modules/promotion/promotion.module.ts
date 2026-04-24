import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OffersComponent } from './components/offers/offers.component';
import { ApplyCouponComponent } from './components/apply-coupon/apply-coupon.component';
import { PromotionRoutingModule } from './promotion-routing.module';

@NgModule({
  declarations: [
    OffersComponent,
    ApplyCouponComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PromotionRoutingModule
  ],
  exports: [
    ApplyCouponComponent
  ]
})
export class PromotionModule { }
