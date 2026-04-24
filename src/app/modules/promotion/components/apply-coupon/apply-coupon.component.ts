import { Component, EventEmitter, Output } from '@angular/core';
import { PromotionService } from '../../services/promotion.service';
import { Promotion } from '../../../../core/models/promotion.models';

@Component({
  selector: 'app-apply-coupon',
  templateUrl: './apply-coupon.component.html',
  styleUrls: ['./apply-coupon.component.css']
})
export class ApplyCouponComponent {
  code: string = '';
  isApplying = false;
  successMessage = '';
  errorMessage = '';

  @Output() couponApplied = new EventEmitter<Promotion>();

  constructor(private promotionService: PromotionService) { }

  applyCoupon(): void {
    if (!this.code.trim()) return;

    this.isApplying = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.promotionService.validate(this.code).subscribe({
      next: (res) => {
        this.isApplying = false;
        if (res.success && res.data) {
          this.successMessage = res.message || 'Coupon applied successfully!';
          this.couponApplied.emit(res.data);
        } else {
          this.errorMessage = res.message || 'Invalid coupon code.';
        }
      },
      error: (err) => {
        this.isApplying = false;
        this.errorMessage = err.error?.message || 'Error validating coupon code.';
      }
    });
  }
}
