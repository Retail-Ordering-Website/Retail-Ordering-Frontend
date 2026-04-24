import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderConfirmationDto } from '../../../../core/models/order.models';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  confirmation: OrderConfirmationDto | null = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { confirmation: OrderConfirmationDto };
    if (state && state.confirmation) {
      this.confirmation = state.confirmation;
    }
  }

  ngOnInit(): void {
    if (!this.confirmation) {
      this.router.navigate(['/history']);
    }
  }
}
