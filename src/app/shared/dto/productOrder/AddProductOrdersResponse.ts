import { ProductOrder } from '../../services/product.service';

export class AddProductOrderResponse {
  productOrder: ProductOrder;

  constructor(data: any) {
    this.productOrder = data?.productOrder;
  }
}
