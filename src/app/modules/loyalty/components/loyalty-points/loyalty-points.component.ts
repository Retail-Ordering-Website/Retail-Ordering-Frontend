import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../../../promotion/services/promotion.service';

@Component({
  selector: 'app-loyalty-points',
  templateUrl: './loyalty-points.component.html',
  styleUrls: ['./loyalty-points.component.css']
})
export class LoyaltyPointsComponent implements OnInit {
  points: number = 0;
  isLoading = true;
  error = '';

  constructor(private promotionService: PromotionService) { }

  ngOnInit(): void {
    this.fetchPoints();
  }

  fetchPoints(): void {
    this.isLoading = true;
    this.promotionService.getLoyaltyPoints().subscribe({
      next: (res) => {
        if (res.success && res.data !== null) {
          this.points = res.data ?? 0;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load loyalty points.';
        this.isLoading = false;
      }
    });
  }
}
