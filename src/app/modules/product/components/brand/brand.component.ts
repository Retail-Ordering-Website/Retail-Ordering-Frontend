import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { BrandDto } from '../../../../core/models/product.models';
import { AuthService } from '../../../../core/services/auth.service';
import { TokenDto } from '../../../../core/models/auth.models';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands: BrandDto[] = [];
  isLoading = true;
  error = '';
  
  isAdmin = false;
  isCreating = false;
  editingBrand: BrandDto | null = null;
  newBrand: BrandDto = { name: '', description: '' };
  
  message = '';
  messageError = '';

  constructor(
    private brandService: BrandService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: TokenDto | null) => {
      this.isAdmin = user?.role === 'Admin';
    });
    this.fetchBrands();
  }

  fetchBrands(): void {
    this.isLoading = true;
    this.brandService.getAll().subscribe({
      next: (res) => {
        if (res.data) this.brands = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load brands.';
        this.isLoading = false;
      }
    });
  }

  onCreate(): void {
    if (!this.newBrand.name) return;
    this.isCreating = true;
    this.brandService.create(this.newBrand).subscribe({
      next: (res) => {
        if (res.data) {
          this.brands.push(res.data);
          this.newBrand = { name: '', description: '' };
          this.message = 'Brand created successfully!';
          setTimeout(() => this.message = '', 3000);
        }
        this.isCreating = false;
      },
      error: () => this.isCreating = false
    });
  }

  onDelete(id: number): void {
    if (confirm('Delete this brand?')) {
      this.brandService.delete(id).subscribe({
        next: () => {
          this.brands = this.brands.filter(b => b.id !== id);
        }
      });
    }
  }
}
