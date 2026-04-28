import { ProductOrder } from '../../services/product.service';

export class GetAllProductOrdersResponse {
  productOrders: ProductOrder[];

  constructor(data: any) {
    this.productOrders = data?.productOrders ?? [];
  }
}
