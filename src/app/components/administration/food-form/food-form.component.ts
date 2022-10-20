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
  urlImage: string;
  URLAPI = environment.urlApi;
  changeImage: boolean;
  messageError = "";

  @Output() onSubmit: EventEmitter<Food | null>;

  constructor(
    public dialogRef: MatDialogRef<FoodFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onSubmit = new EventEmitter<Food | null>();
    this.form = this.generateForm();
    this.listCategories = [];
  }

 
  ngOnInit() {
    this.mapedCategories()
    this.urlImage = this.data.food?.urlImage == '' ? null : this.data.food?.urlImage;
    this.nameImage = this.data.food?.urlImage == '' ? null : this.data.food?.urlImage;
  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.food?.id),
      title: new FormControl(this.data.food?.title, Validators.required),
      description: new FormControl(this.data.food?.description),
    });
  }

  onClickCancel() {
    this.mapedCategories()
    this.dialogRef.close();
  }

  onClickSave() {
    const categoriesSelected = this.listCategories.filter(c => c.checked);
    if (categoriesSelected.length < 1) {
      this.messageError = "Debe seleccionar al menos una categoría";
      return null;
    }
    this.result = this.form.getRawValue();
    this.result.categories = this.listCategories
    if (this.nameImage != null)
      this.result.image = this.image;

    this.onSubmit.emit(this.result);
    this.cleanList()

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

  onChangeImagen() {
    this.changeImage = true;
    this.nameImage = null;
    return false;
  }

  mapedCategories(){
    if(this.data.actionForm == "Editar"){
      this.listCategories = [];
      for (let cat of this.data.food?.categories){
        this.listCategories.push(new Category (cat))
      }
    }
    else{
    this.listCategories = this.data.listCategories
   }
  }
  cleanList(){
    this.listCategories.forEach(cat => cat.checked = false)
  }

}
