import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GetCategoryResponse } from 'src/app/shared/dto/category/GetCategoryResponse';
import { GetFoodByCategoryRequest } from 'src/app/shared/dto/food/GetFoodByCategoryRequest';
import { GetFoodResponse } from 'src/app/shared/dto/food/GetFoodResponse';
import { EditMenuRequest } from 'src/app/shared/dto/menu/EditMenuRequest';
import { Category } from 'src/app/shared/models/Category';
import { Food } from 'src/app/shared/models/Food';
import { CategoryService } from 'src/app/shared/services/category.service';
import { FoodService } from 'src/app/shared/services/food.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  
  result: EditMenuRequest;
  form: FormGroup;
  listCategories: Category[];
  listFood: Food[];
  idCatSelected : number;

  @Output() onSubmit: EventEmitter<EditMenuRequest | null>;


  constructor(private foodService : FoodService,
    private categoryService : CategoryService,
    public dialogRef: MatDialogRef<EditMenuComponent>) {
    this.onSubmit = new EventEmitter<EditMenuRequest | null>();
    this.form = this.generateForm();
    this.getCategories();
   }

  ngOnInit(): void {
  }
  async getCategories() {
    await this.categoryService.getCategories().subscribe((res: GetCategoryResponse) => {
      this.listCategories = res.categories;
    })
  }

  async GetFoodByCategory(cat : number) {
    const request : GetFoodByCategoryRequest = {
      idCategory : cat
    }
    await this.foodService.getFoodByCategory(request).subscribe((res: GetFoodResponse) => {
      this.listFood = res.food;
    })
  }


  generateForm(): FormGroup {
    return new FormGroup({
      date: new FormControl(new Date,Validators.required),
      idFood: new FormControl('',Validators.required),
    });
  }

  onClickCancel() {
    this.dialogRef.close();
  }
  onClickSave() {
    this.result = this.form.getRawValue();
    this.onSubmit.emit(this.result);
  }

  select(cat : any){
    this.idCatSelected = (cat.value)
    this.GetFoodByCategory(this.idCatSelected)
  }

}
