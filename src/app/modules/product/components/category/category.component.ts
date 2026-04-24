import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategoryDto } from '../../../../core/models/product.models';
import { AuthService } from '../../../../core/services/auth.service';
import { TokenDto } from '../../../../core/models/auth.models';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: CategoryDto[] = [];
  isLoading = true;
  error = '';
  
  isAdmin = false;
  isCreating = false;
  newCategory: CategoryDto = { name: '', description: '' };
  createMessage = '';
  createError = '';

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: TokenDto | null) => {
      this.isAdmin = user?.role === 'Admin';
    });
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.isLoading = true;
    this.categoryService.getAll().subscribe({
      next: (res) => {
        if (res.data) {
          this.categories = res.data;
        } else {
          this.error = res.message || 'Failed to load categories.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'An error occurred while fetching categories.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onCreate(): void {
    if (!this.newCategory.name) return;

    this.isCreating = true;
    this.createMessage = '';
    this.createError = '';

    this.categoryService.create(this.newCategory).subscribe({
      next: (res) => {
        if (res.data) {
          this.categories.push(res.data);
          this.createMessage = 'Category created successfully!';
          this.newCategory = { name: '', description: '' };
          setTimeout(() => this.createMessage = '', 3000);
        } else {
          this.createError = res.message || 'Failed to create category.';
        }
        this.isCreating = false;
      },
      error: (err) => {
        this.createError = err.error?.message || 'Error creating category.';
        this.isCreating = false;
      }
    });
  }
}
