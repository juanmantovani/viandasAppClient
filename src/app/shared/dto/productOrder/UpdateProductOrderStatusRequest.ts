import { ProductOrderStatus } from '../../services/product.service';

export interface UpdateProductOrderStatusRequest {
  idProductOrderItem: number;
  status: ProductOrderStatus;
}
