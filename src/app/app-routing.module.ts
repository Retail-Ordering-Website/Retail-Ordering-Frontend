import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  { path: 'inventory', loadChildren: () => import('./modules/inventory/inventory.module').then(m => m.InventoryModule) },
  { path: 'products', loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule) },
  { path: 'cart', loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule) },
  { path: 'history', loadChildren: () => import('./modules/history/history.module').then(m => m.HistoryModule) },
  { path: 'order', loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule) },
  { path: 'promotions', loadChildren: () => import('./modules/promotion/promotion.module').then(m => m.PromotionModule) },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
