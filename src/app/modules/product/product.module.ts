import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CategoryComponent } from './components/category/category.component';
import { BrandComponent } from './components/brand/brand.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    CategoryComponent,
    BrandComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
