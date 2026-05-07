import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from 'src/app/shared/models/ProductCategory';
import { Product } from 'src/app/shared/models/Product';
import { ProductCategoryService } from 'src/app/shared/services/product-category.service';
import { ProductService, ProductOrder } from 'src/app/shared/services/product.service';
import { GetProductCategoryResponse } from 'src/app/shared/dto/productCategory/GetProductCategoryResponse';
import { GetProductResponse } from 'src/app/shared/dto/product/GetProductResponse';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ClientService } from 'src/app/shared/services/client.service';
import { Client } from 'src/app/shared/models/Client';
import { environment } from 'src/environments/environment';

export interface ProductOrderItem {
  product: Product;
  cant: number;
}

export interface CategoryGroup {
  category: ProductCategory;
  items: ProductOrderItem[];
}

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent implements OnInit {

  URLAPI = environment.urlApi.replace(/\/app$/, '');

  stepperOrientation: Observable<StepperOrientation>;
  @ViewChild('stepper') stepper!: MatStepper;

  categoryGroups: CategoryGroup[] = [];
  orderSuccess: boolean = false;

  firstStepCompleted: boolean = false;
  disableNextButton: boolean = true;
  disableBackButton: boolean = true;
  finishButton: boolean = false;

  userProfile: KeycloakProfile | null = null;
  clientPersonified: Client | null = null;
  whatsappText: string = '';
  whatsappSend: string = '';

  constructor(
    breakpointObserver: BreakpointObserver,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private readonly keycloak: KeycloakService,
    private clientService: ClientService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.keycloak.loadUserProfile().then(profile => {
      this.userProfile = profile;
    });
    const personified = this.clientService.getClientPersonified();
    if (personified) {
      this.clientPersonified = new Client(personified);
    }

    forkJoin({
      cats: this.productCategoryService.getProductCategories(),
      prods: this.productService.getProducts()
    }).subscribe(({ cats, prods }: { cats: GetProductCategoryResponse; prods: GetProductResponse }) => {
      const available = prods.products.filter(p => p.available);
      this.categoryGroups = (cats.productCategories as ProductCategory[])
        .map(cat => ({
          category: cat,
          items: available
            .filter(p => p.productCategoryId === cat.id)
            .map(p => ({ product: p, cant: 0 }))
        }))
        .filter(g => g.items.length > 0);
    });
  }

  increment(item: ProductOrderItem): void {
    item.cant++;
    this.disableNextButton = !this.hasSelection();
  }

  decrement(item: ProductOrderItem): void {
    if (item.cant > 0) {
      item.cant--;
      this.disableNextButton = !this.hasSelection();
    }
  }

  hasSelection(): boolean {
    return this.categoryGroups.some(g => g.items.some(i => i.cant > 0));
  }

  get selectedItems(): ProductOrderItem[] {
    return this.categoryGroups.flatMap(g => g.items).filter(i => i.cant > 0);
  }

  get selectedCount(): number {
    return this.categoryGroups.flatMap(g => g.items).reduce((sum, i) => sum + i.cant, 0);
  }

  get totalPrice(): number {
    return this.categoryGroups.flatMap(g => g.items).reduce((sum, i) => sum + i.cant * i.product.price, 0);
  }

  getCategoryName(productCategoryId: number): string {
    const group = this.categoryGroups.find(g => g.category.id === productCategoryId);
    return group ? group.category.title : '-';
  }

  private getClientName(): { name: string; lastName: string } {
    if (this.clientPersonified) {
      return { name: this.clientPersonified.name, lastName: this.clientPersonified.lastName };
    }
    return { name: this.userProfile?.firstName ?? '', lastName: this.userProfile?.lastName ?? '' };
  }

  formatWhatsappMessage(): void {
    const { name, lastName } = this.getClientName();
    let text = `Hola, mi nombre es ${name} ${lastName} y quisiera hacer el siguiente pedido:\n`;
    this.selectedItems.forEach(item => {
      text += `- ${item.cant}x ${item.product.title} ($${item.cant * item.product.price})\n`;
    });
    text += '-----------------------------------\n';
    text += `Total: $${this.totalPrice}`;
    this.whatsappText = text;
    this.whatsappSend = text.replace(/[\n]/g, '%0a');
  }

  saveOrder(): void {
    const { name, lastName } = this.getClientName();
    const order: Omit<ProductOrder, 'id'> = {
      clientName: name,
      clientLastName: lastName,
      date: new Date().toISOString(),
      products: this.selectedItems.map(item => ({
        productTitle: item.product.title,
        productCategoryTitle: this.getCategoryName(item.product.productCategoryId),
        cant: item.cant,
        status: 'pendiente'
      }))
    };
    this.productService.addProductOrder(order).subscribe();
  }

  onStepComplete(): void {
    const idx = this.stepper.selectedIndex;
    switch (idx) {
      case 0:
        this.disableBackButton = false;
        this.disableNextButton = false;
        this.finishButton = true;
        break;
      case 1:
        this.saveOrder();
        this.formatWhatsappMessage();
        this.orderSuccess = true;
        break;
    }
    this.stepper.next();
  }

  onClickBack(): void {
    const idx = this.stepper.selectedIndex;
    if (idx === 1) {
      this.disableBackButton = true;
      this.finishButton = false;
      this.disableNextButton = !this.hasSelection();
    }
    this.stepper.previous();
  }
}
