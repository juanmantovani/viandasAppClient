import { Product } from '../../models/Product';
import { BaseResponse } from '../BaseResponse';

export class GetProductResponse extends BaseResponse {
    products: Product[];

    constructor(data: any) {
        super(data);
        if (data)
            this.products = data.map((p: any) => new Product(p));
    }
}
