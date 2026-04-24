import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { InventoryDto, StockUpdateDto } from '../../../../core/models/inventory.models';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.css']
})
export class InventoryManagementComponent implements OnInit {
  inventoryItems: InventoryDto[] = [];
  isLoading = true;
  error = '';
  updatingStockId: number | null = null;
  savedStockId: number | null = null;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.fetchInventory();
  }

  fetchInventory(): void {
    this.isLoading = true;
    this.inventoryService.getInventory().subscribe({
      next: (res) => {
        if (res.data) {
          this.inventoryItems = res.data;
        } else {
          this.error = res.message || 'Failed to load inventory.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'An error occurred while fetching inventory.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  updateStock(item: InventoryDto, newStockValue: string): void {
    const newStock = parseInt(newStockValue, 10);
    if (isNaN(newStock) || newStock < 0) return;

    this.updatingStockId = item.productId;
    const updateDto: StockUpdateDto = { productId: item.productId, stock: newStock };

    this.inventoryService.updateStock(updateDto).subscribe({
      next: (res) => {
        if (res.success || res.data) {
          item.stock = newStock;
          this.savedStockId = item.productId;
          setTimeout(() => this.savedStockId = null, 2000);
        }
        this.updatingStockId = null;
      },
      error: (err) => {
        console.error('Failed to update stock', err);
        this.updatingStockId = null;
      }
    });
  }
}
