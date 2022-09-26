import { Component, OnInit, Output,EventEmitter,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/shared/models/Category';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  result: Category;
  form: FormGroup;
  URLAPI = environment.urlApi;

  @Output() onSubmit: EventEmitter<Category | null>;


  constructor(
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onSubmit = new EventEmitter<Category | null>();
    this.form = this.generateForm();
  }

  ngOnInit(): void {
  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.category?.id),
      title: new FormControl(this.data.category?.title, Validators.required),
      description: new FormControl(this.data.category?.description),
      price: new FormControl(this.data.category?.price),
    });
  }

  onClickCancel() {
    this.dialogRef.close();
  }
  onClickSave() {
    this.result = this.form.getRawValue();
    this.onSubmit.emit(this.result);
  }

 
 

}
