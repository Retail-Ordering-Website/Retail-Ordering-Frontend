import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryManagementComponent } from './components/inventory-management/inventory-management.component';

const routes: Routes = [
  { path: 'manage', component: InventoryManagementComponent },
  { path: '', redirectTo: 'manage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
