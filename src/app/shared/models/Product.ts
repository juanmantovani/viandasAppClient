export class Product {
    id: number;
    title: string;
    description: string;
    price: number;
    available: boolean;
    image: Blob;
    urlImage: string;
    productCategoryId: number;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.title = data.title;
            this.description = data.description;
            this.price = data.price;
            this.available = data.available;
            this.urlImage = data.urlImage;
            this.productCategoryId = data.productCategoryId;
        }
    }
}
