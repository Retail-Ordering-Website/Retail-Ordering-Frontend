import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../../services/promotion.service';
import { Promotion } from '../../../../core/models/promotion.models';
import { AuthService } from '../../../../core/services/auth.service';
import { TokenDto } from '../../../../core/models/auth.models';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  promotions: Promotion[] = [];
  loyaltyPoints: number = 0;
  
  isLoading = true;
  error = '';
  
  isAdmin = false;
  isCreating = false;
  newPromo: Partial<Promotion> = {
    name: '',
    description: '',
    code: '',
    discountPercent: 0,
    minOrderAmount: 0,
    startDate: new Date().toISOString().substring(0, 10),
    endDate: '',
    isActive: true,
    totalUsageCount: 0,
    maxTotalUsage: 100
  };
  createMessage = '';
  createError = '';

  constructor(
    private promotionService: PromotionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: TokenDto | null) => {
      this.isAdmin = user?.role === 'Admin';
      if (user) {
        this.fetchLoyaltyPoints();
      }
    });
    this.fetchPromotions();
  }

  fetchPromotions(): void {
    this.isLoading = true;
    this.promotionService.getActive().subscribe({
      next: (res) => {
        if (res.data) this.promotions = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load offers.';
        this.isLoading = false;
      }
    });
  }

  fetchLoyaltyPoints(): void {
    this.promotionService.getLoyaltyPoints().subscribe({
      next: (res) => {
        if (res.data !== null) this.loyaltyPoints = res.data ?? 0;
      }
    });
  }

  onCreatePromo(): void {
    if (!this.newPromo.code || !this.newPromo.endDate) return;
    
    this.isCreating = true;
    this.createMessage = '';
    this.createError = '';
    
    const promoToCreate: Promotion = { ...this.newPromo } as Promotion;
    promoToCreate.startDate = new Date(this.newPromo.startDate!).toISOString();
    promoToCreate.endDate = new Date(this.newPromo.endDate!).toISOString();

    this.promotionService.createPromotion(promoToCreate).subscribe({
      next: (res) => {
        if (res.data) {
          this.promotions.push(res.data);
          this.createMessage = 'Promotion created successfully!';
          this.newPromo.code = '';
          this.newPromo.name = '';
        }
        this.isCreating = false;
      },
      error: (err) => {
        this.createError = err.error?.message || 'Error creating promotion.';
        this.isCreating = false;
      }
    });
  }

  onExpire(id: number): void {
    if (confirm('Are you sure you want to expire this promotion?')) {
      this.promotionService.expirePromotion(id).subscribe({
        next: () => {
          this.promotions = this.promotions.filter(p => p.id !== id);
        }
      });
    }
  }
}
