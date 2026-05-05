import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductCategory } from 'src/app/shared/models/ProductCategory';

@Component({
  selector: 'app-product-category-form',
  templateUrl: './product-category-form.component.html',
  styleUrls: ['./product-category-form.component.css']
})
export class ProductCategoryFormComponent implements OnInit {

  form: FormGroup;

  @Output() onSubmit: EventEmitter<ProductCategory | null>;

  constructor(
    public dialogRef: MatDialogRef<ProductCategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onSubmit = new EventEmitter<ProductCategory | null>();
    this.form = this.generateForm();
  }

  ngOnInit() {}

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.productCategory?.id),
      title: new FormControl(this.data.productCategory?.title, Validators.required),
      description: new FormControl(this.data.productCategory?.description),
    });
  }

  onClickCancel() {
    this.dialogRef.close();
  }

  onClickSave() {
    const result: ProductCategory = this.form.getRawValue();
    this.onSubmit.emit(result);
  }
}
