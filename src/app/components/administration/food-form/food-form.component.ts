import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/shared/models/Category';
import { Food } from 'src/app/shared/models/Food';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.css']
})
export class FoodFormComponent implements OnInit {

  result: Food;
  form: FormGroup;
  image: File;
  nameImage?: string | null;
  listCategories: Category[];
  idCatSelected: number;
  urlImage: string;
  URLAPI = environment.urlApi;
  changeImage: boolean;

  @Output() onSubmit: EventEmitter<Food | null>;

  constructor(
    public dialogRef: MatDialogRef<FoodFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onSubmit = new EventEmitter<Food | null>();
    this.form = this.generateForm();
  }

  ngOnInit() {
  this.listCategories = this.data.listCategories;
  this.idCatSelected = this.data.food?.category?.id;
  this.urlImage = this.data.food?.urlImage == '' ? null : this.data.food?.urlImage;
  this.nameImage =  this.data.food?.urlImage == '' ? null : this.data.food?.urlImage;

  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.food?.id),
      title: new FormControl(this.data.food?.title, Validators.required),
      description: new FormControl(this.data.food?.description),
      category: new FormControl(this.data.food?.category),
    });
  }

  onClickCancel() {
    this.dialogRef.close();
  }
  onClickSave() {
    this.result = this.form.getRawValue();
    if(this.nameImage != null)
      this.result.image = this.image;
    this.result.category = this.listCategories.find(c => c.id == this.idCatSelected)
    this.onSubmit.emit(this.result);
  }

  onChangeDateStart(e: any) {
    const date: Date = e?.value;
  }

  onSelect(event: any) {
    this.image = event.addedFiles[0];
    this.nameImage = event.addedFiles[0].name;
  }

  onRemove(event: any) {
    this.nameImage = null;
  }

  onChangeImagen(){
    this.changeImage = true;
    this.nameImage = null;
    return false;
  }
}
