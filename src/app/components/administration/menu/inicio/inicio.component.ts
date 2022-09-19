import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/shared/models/Category';
import { FoodService } from 'src/app/shared/services/food.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { GetFoodResponse } from 'src/app/shared/dto/food/GetFoodResponse';
import { Food } from 'src/app/shared/models/Food';
import { GetCategoryResponse } from 'src/app/shared/dto/category/GetCategoryResponse';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class MenuInicioComponent implements OnInit {

  range: FormGroup;
  rangeOfDate: any;
  formMenu: FormGroup;
  listCategories: Category[];
  viewCategories: boolean = false;



  constructor( 
    private foodService: FoodService,
  ) { 
    this.range = this.generateFormWeeks();
    this.getCategories();

  }

  ngOnInit(): void {

  }

  generateFormWeeks(): FormGroup {
    return new FormGroup({
      //weeks: new FormControl('', Validators.required),
      start: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required),
    });
  }

  onClickWeeks() {
    this.rangeOfDate = this.range;
    this.viewCategories = true;
  //   this.cantWeeks = [];
  //   const CANTWEEKS = this.range.getRawValue();
  //   for (let i=0; i < CANTWEEKS.weeks; i++){
  //     this.cantWeeks.push("Semana " + (i+1).toString());
  //   }
   }

   async getCategories() {
    await this.foodService.getCategories().subscribe((res: GetCategoryResponse) => {
      this.listCategories = res.listCategories;
    })
  }

}
