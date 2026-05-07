import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/shared/models/Product';
import { ProductCategory } from 'src/app/shared/models/ProductCategory';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  result: Product;
  form: FormGroup;
  productCategories: ProductCategory[] = [];
  image: File;
  nameImage?: string | null;
  urlImage: string;
  changeImage: boolean;
  URLAPI = environment.urlApi;

  @Output() onSubmit: EventEmitter<Product | null>;

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onSubmit = new EventEmitter<Product | null>();
    this.form = this.generateForm();
  }

  ngOnInit() {
    this.productCategories = this.data.productCategories || [];
    this.urlImage = this.data.product?.urlImage === '' ? null : this.data.product?.urlImage;
    this.nameImage = this.data.product?.urlImage === '' ? null : this.data.product?.urlImage;
  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.product?.id),
      title: new FormControl(this.data.product?.title, Validators.required),
      description: new FormControl(this.data.product?.description),
      price: new FormControl(this.data.product?.price, [Validators.required, Validators.min(0)]),
      available: new FormControl(this.data.product?.available ?? true),
      productCategoryId: new FormControl(this.data.product?.productCategoryId, Validators.required),
    });
  }

  onClickCancel() {
    this.dialogRef.close();
  }

  onClickSave() {
    this.result = this.form.getRawValue();
    if (this.nameImage != null)
      this.result.image = this.image;
    this.onSubmit.emit(this.result);
  }

  onSelect(event: any) {
    this.image = event.addedFiles[0];
    this.nameImage = event.addedFiles[0].name;
  }

  onRemove(event: any) {
    this.nameImage = null;
  }

  onChangeImagen() {
    this.changeImage = true;
    this.nameImage = null;
    return false;
  }
}
