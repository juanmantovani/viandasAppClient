import { ProductOrderStatus } from '../../services/product.service';

export interface UpdateProductOrderStatusRequest {
  idProductOrder: number;
  status: ProductOrderStatus;
}
