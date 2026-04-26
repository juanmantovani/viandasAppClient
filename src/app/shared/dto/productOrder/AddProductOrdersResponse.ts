import { ProductOrderRow } from '../../services/product.service';

export class AddProductOrdersResponse {
  productOrders: ProductOrderRow[];

  constructor(data: any) {
    this.productOrders = data?.productOrders ?? [];
  }
}
