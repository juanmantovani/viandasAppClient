import { ProductCategory } from '../../models/ProductCategory';

export class GetProductCategoryResponse {
  productCategories: ProductCategory[];

  constructor(data: any) {
    this.productCategories = data?.productCategories?.map((c: any) => new ProductCategory(c)) || [];
  }
}
