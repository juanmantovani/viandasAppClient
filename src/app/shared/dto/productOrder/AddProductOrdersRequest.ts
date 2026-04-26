import { ProductOrderRow } from '../../services/product.service';

export interface AddProductOrdersRequest {
  orders: Omit<ProductOrderRow, 'id'>[];
}
