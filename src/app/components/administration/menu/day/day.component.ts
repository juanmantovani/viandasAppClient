import { Component, Input, Output, OnInit,EventEmitter,SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Food } from '../../../../shared/models/Food';
import { Day } from '../../../../shared/models/Day';
import { Category } from 'src/app/shared/models/Category';
import { FoodService } from 'src/app/shared/services/food.service';
import { GetFoodResponse } from 'src/app/shared/dto/food/GetFoodResponse';
import { GetFoodByCategoryRequest } from 'src/app/shared/dto/food/GetFoodByCategoryRequest';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input() daysOfMonth : any[];
  @Input() lastCategory: boolean;
  @Input() category: Category;

  @Output() daysCharged : EventEmitter <Day[]> = new EventEmitter();
  @Output() finishCharged : EventEmitter <boolean> = new EventEmitter();

  viewForm: boolean = false;
  form: FormGroup;
  listFood: Food[];

  constructor( private fb: FormBuilder, private foodService : FoodService ) {
  }


  async getFoodByCategory(){
    const request : GetFoodByCategoryRequest = {
    idCategory : this.category.id
    }
    await this.foodService.getFoodByCategory(request).subscribe((res: GetFoodResponse) => {
      this.listFood = res.food;
    })
  }

  ngOnInit(): void {
    this.generateForm();
    this.addDays();
    this.getFoodByCategory()
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes?.daysOfMonth){
      this.generateForm()
      this.addDays();
    }
  }

  generateForm() {
    this.form = this.fb.group({
      days : this.fb.array([])
    });
  }

  addDays () {
    this.daysOfMonth.forEach( value => {
      const day = this.fb.group({
        food: new FormControl('', Validators.required),
        date : value.date,
        category : this.category
      })
      this.days.push(day);
    })
  }

  get days(): FormArray {
    return this.form.get('days') as FormArray;
  }

  onClickSave(){  
    this.daysCharged.emit(this.days.getRawValue())
    if (this.lastCategory){
      this.finishCharged.emit(true);
    }
  }
}
