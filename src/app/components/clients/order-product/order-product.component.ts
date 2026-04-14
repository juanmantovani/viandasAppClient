import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from 'src/app/shared/models/ProductCategory';
import { Product } from 'src/app/shared/models/Product';
import { ProductCategoryService } from 'src/app/shared/services/product-category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { GetProductCategoryResponse } from 'src/app/shared/dto/productCategory/GetProductCategoryResponse';
import { GetProductResponse } from 'src/app/shared/dto/product/GetProductResponse';

export interface ProductOrderItem {
  product: Product;
  cant: number;
}

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent implements OnInit {

  stepperOrientation: Observable<StepperOrientation>;
  @ViewChild('stepper') stepper!: MatStepper;

  selectedDate: Date | null = null;
  minDate: Date;
  firstStepCompleted: boolean = false;

  categories: ProductCategory[] = [];
  selectedCategory: ProductCategory | null = null;
  secondStepCompleted: boolean = false;

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  productOrders: ProductOrderItem[] = [];

  disableNextButton: boolean = true;
  disableBackButton: boolean = true;
  finishButton: boolean = false;
  orderSuccess: boolean = false;

  constructor(
    breakpointObserver: BreakpointObserver,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.productCategoryService.getProductCategories().subscribe((res: GetProductCategoryResponse) => {
      this.categories = res.productCategories;
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe((res: GetProductResponse) => {
      this.allProducts = res.products.filter(p => p.available);
    });
  }

  onDateSelected(date: Date): void {
    this.selectedDate = date;
    this.firstStepCompleted = true;
    this.disableNextButton = false;
  }

  onSelectCategory(category: ProductCategory): void {
    this.selectedCategory = category;
    this.secondStepCompleted = true;
    this.disableNextButton = false;
  }

  isCategorySelected(category: ProductCategory): boolean {
    return this.selectedCategory?.id === category.id;
  }

  filterProductsByCategory(): void {
    if (this.selectedCategory) {
      this.filteredProducts = this.allProducts.filter(
        p => p.productCategoryId === this.selectedCategory!.id
      );
      this.productOrders = this.filteredProducts.map(p => ({ product: p, cant: 0 }));
    }
  }

  increment(po: ProductOrderItem): void {
    po.cant++;
  }

  decrement(po: ProductOrderItem): void {
    if (po.cant > 0) po.cant--;
  }

  hasSelection(): boolean {
    return this.productOrders.some(po => po.cant > 0);
  }

  // El componente accede directamente al stepper via @ViewChild
  onStepComplete(): void {
    const idx = this.stepper.selectedIndex;
    switch (idx) {
      case 0:
        this.disableBackButton = false;
        this.disableNextButton = !this.selectedCategory;
        this.finishButton = false;
        break;
      case 1:
        this.filterProductsByCategory();
        this.disableNextButton = false;
        this.finishButton = true;
        break;
      case 2:
        this.orderSuccess = true;
        break;
    }
    this.stepper.next();
  }

  onClickBack(): void {
    const idx = this.stepper.selectedIndex;
    this.disableBackButton = idx <= 1;
    this.finishButton = false;
    if (idx === 1) this.disableNextButton = !this.firstStepCompleted;
    if (idx === 2) this.disableNextButton = !this.selectedCategory;
    this.stepper.previous();
  }

  get selectedCount(): number {
    return this.productOrders.reduce((sum, po) => sum + po.cant, 0);
  }

  get totalPrice(): number {
    return this.productOrders.reduce((sum, po) => sum + po.cant * po.product.price, 0);
  }
}
