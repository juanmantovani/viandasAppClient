import { ProductCategory } from '../../models/ProductCategory';

export class EditProductCategoryResponse {
  productCategory: ProductCategory;

  constructor(data: any) {
    this.productCategory = new ProductCategory(data?.productCategory);
  }
}
