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

  startEdit(brand: BrandDto): void {
    this.editingBrand = { ...brand };
    this.newBrand = { ...brand };
  }

  cancelEdit(): void {
    this.editingBrand = null;
    this.newBrand = { name: '', description: '' };
  }

  onCreate(): void {
    if (!this.newBrand.name) return;
    this.isCreating = true;
    this.brandService.create(this.newBrand).subscribe({
      next: (res) => {
        if (res.success && res.data) {
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

  onUpdate(): void {
    if (!this.editingBrand || !this.newBrand.name) return;
    this.isCreating = true;
    this.brandService.update(this.editingBrand.id!, this.newBrand).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const index = this.brands.findIndex(b => b.id === this.editingBrand?.id);
          if (index !== -1) this.brands[index] = res.data;
          this.cancelEdit();
          this.message = 'Brand updated successfully!';
          setTimeout(() => this.message = '', 3000);
        }
        this.isCreating = false;
      },
      error: () => this.isCreating = false
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this brand?')) {
      this.brandService.delete(id).subscribe({
        next: (res) => {
          if (res.success) {
            this.brands = this.brands.filter(b => b.id !== id);
          }
        }
      });
    }
  }
}
