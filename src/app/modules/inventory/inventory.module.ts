import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryManagementComponent } from './components/inventory-management/inventory-management.component';
import { InventoryRoutingModule } from './inventory-routing.module';

@NgModule({
  declarations: [
    InventoryManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
