import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductCategory } from '../models/ProductCategory';
import { AddProductCategoryRequest } from '../dto/productCategory/AddProductCategoryRequest';
import { AddProductCategoryResponse } from '../dto/productCategory/AddProductCategoryResponse';
import { EditProductCategoryRequest } from '../dto/productCategory/EditProductCategoryRequest';
import { EditProductCategoryResponse } from '../dto/productCategory/EditProductCategoryResponse';
import { DeleteProductCategoryRequest } from '../dto/productCategory/DeleteProductCategoryRequest';
import { DeleteProductCategoryResponse } from '../dto/productCategory/DeleteProductCategoryResponse';
import { GetProductCategoryResponse } from '../dto/productCategory/GetProductCategoryResponse';

const STORAGE_KEY = 'mock_product_categories';

const DEFAULT_CATEGORIES = [
  { id: 1, title: 'Postres', description: 'Postres y dulces' },
  { id: 2, title: 'Ensaladas', description: 'Ensaladas frescas' },
  { id: 3, title: 'Bebidas', description: 'Bebidas frías y calientes' },
];

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private loadFromStorage(): ProductCategory[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored).map((c: any) => new ProductCategory(c));
    }
    const defaults = DEFAULT_CATEGORIES.map(c => new ProductCategory(c));
    this.saveToStorage(defaults);
    return defaults;
  }

  private saveToStorage(items: ProductCategory[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  private nextId(items: ProductCategory[]): number {
    return items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
  }

  getProductCategories(): Observable<GetProductCategoryResponse> {
    const productCategories = this.loadFromStorage();
    return of(new GetProductCategoryResponse({ productCategories }));
  }

  addProductCategory(request: AddProductCategoryRequest): Observable<AddProductCategoryResponse> {
    const items = this.loadFromStorage();
    const newItem = new ProductCategory({
      ...request.productCategory,
      id: this.nextId(items)
    });
    items.push(newItem);
    this.saveToStorage(items);
    return of(new AddProductCategoryResponse({ productCategory: newItem }));
  }

  editProductCategory(request: EditProductCategoryRequest): Observable<EditProductCategoryResponse> {
    const items = this.loadFromStorage();
    const index = items.findIndex(i => i.id === request.productCategory.id);
    if (index !== -1) {
      items[index] = new ProductCategory(request.productCategory);
    }
    this.saveToStorage(items);
    return of(new EditProductCategoryResponse({ productCategory: request.productCategory }));
  }

  deleteProductCategory(request: DeleteProductCategoryRequest): Observable<DeleteProductCategoryResponse> {
    const items = this.loadFromStorage().filter(i => i.id !== request.idProductCategory);
    this.saveToStorage(items);
    return of(new DeleteProductCategoryResponse({}));
  }
}
