import { ProductCategory } from '../../models/ProductCategory';

export class AddProductCategoryResponse {
  productCategory: ProductCategory;

  constructor(data: any) {
    this.productCategory = new ProductCategory(data?.productCategory);
  }
}
