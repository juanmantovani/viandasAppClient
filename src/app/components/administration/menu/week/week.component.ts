import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../shared/models/Category';
import { FoodService } from '../../../../shared/services/food.service';
import { GetCategoryResponse } from '../../../../shared/dto/category/GetCategoryResponse';
import { GetFoodResponse } from '../../../../shared/dto/food/GetFoodResponse';
import { Food } from '../../../../shared/models/Food';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})

export class WeekComponent implements OnInit {

  @Input() cantWeeks: string[];
  minDateEnd: Date;
  listCategories: Category[];
  formMenu: FormGroup;

  constructor(
    private foodService: FoodService,
  ) { 
    this.minDateEnd = new Date();
    this.formMenu = this.generateFormMenu();
    this.listCategories = [];
  }

  ngOnInit(): void {
    this.getCategories();
  }

  onChangeDateStart(e: any) {
    const date: Date = e?.value;
    if (date) this.minDateEnd = date;
  }

  generateFormMenu(): FormGroup {
    return new FormGroup({
      dateStart: new FormControl('',Validators.required),
      dateEnd: new FormControl('', Validators.required),
    });
  }

  async getCategories() {
    await this.foodService.getCategories().subscribe((res: GetCategoryResponse) => {
      this.listCategories = res.listCategories;
    })
  }
}
