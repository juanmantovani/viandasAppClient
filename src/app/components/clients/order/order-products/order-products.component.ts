import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';

export interface ProductOrder {
  product: Product;
  cant: number;
}

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.css']
})
export class OrderProductsComponent implements OnChanges {

  @Input() products: Product[] = [];
  @Output() productsSelected = new EventEmitter<ProductOrder[]>();

  productOrders: ProductOrder[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products'] && this.products) {
      this.productOrders = this.products.map(p => ({ product: p, cant: 0 }));
    }
  }

  increment(po: ProductOrder) {
    po.cant++;
    this.emitSelection();
  }

  decrement(po: ProductOrder) {
    if (po.cant > 0) {
      po.cant--;
      this.emitSelection();
    }
  }

  emitSelection() {
    const selected = this.productOrders.filter(po => po.cant > 0);
    this.productsSelected.emit(selected);
  }
}
