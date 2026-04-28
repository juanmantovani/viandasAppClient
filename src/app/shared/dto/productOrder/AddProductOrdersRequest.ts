import { ProductOrder } from '../../services/product.service';

export interface AddProductOrderRequest {
  order: Omit<ProductOrder, 'id'>;
}
