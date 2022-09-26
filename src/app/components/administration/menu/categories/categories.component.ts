import { Component, Input, OnInit } from '@angular/core';
import { GetCategoryResponse } from 'src/app/shared/dto/category/GetCategoryResponse';
import { AddMenuRequest } from 'src/app/shared/dto/menu/AddMenuRequest';
import { AddMenuResponse } from 'src/app/shared/dto/menu/AddMenuResponse';
import { DayRequest } from 'src/app/shared/dto/menu/DayRequest';
import { TurnRequest } from 'src/app/shared/dto/menu/TurnRequest';
import { Day } from 'src/app/shared/models/Day';
import { Turn } from 'src/app/shared/models/Turn';
import { MenuService } from 'src/app/shared/services/menu.service';
import { GetFoodResponse } from '../../../../shared/dto/food/GetFoodResponse';
import { Category } from '../../../../shared/models/Category';
import { Food } from '../../../../shared/models/Food';
import { FoodService } from '../../../../shared/services/food.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input() dateStart: Date;
  @Input() dateEnd: Date;
  @Input() daysOfMonth: any;
  listCategories: Category[];
  listFood: Food[];
  turn: Turn;
  viewDays: boolean;
  selectedIndexMatTab: number;

  constructor(private foodService: FoodService, private menuService : MenuService) {
    this.listFood = [];
    this.selectedIndexMatTab = 0;
    this.turn = new Turn(null);
  }

  ngOnInit(): void {
    this.getCategories();
    this.getFood();
    this.viewDays = true
  }

  async getCategories() {
    await this.foodService.getCategories().subscribe((res: GetCategoryResponse) => {
      this.listCategories = res.listCategories;
    })
  }

  async getFood() {
    await this.foodService.getFood().subscribe((res: GetFoodResponse) => {
      this.listFood = res.food;
    })
  }

  filterFoodByCategory(category: Category): Food[] {
    return this.listFood.filter(food => {
      return food.category.id == category.id;
    });
  }

  getDays(days: Day[]) {
    if (this.turn.days == undefined)
      this.turn.days = days
    else
      this.turn.days = this.turn.days.concat(days)
    this.selectedIndexMatTab = this.selectedIndexMatTab + 1;
  }

  async addMenu(event: boolean) {

    const turnRequest: TurnRequest = {
      dateStart: this.dateStart,
      dateEnd: this.dateEnd,
      id: 1,
      days: []
    };
    this.turn.days.forEach(day => {
      const dayRequest: DayRequest = {
        date: day.date,
        idFood: day.food.id
      }
      turnRequest.days.push(dayRequest)
    })
    const addMenuRequest: AddMenuRequest = {
      turns: []
    };
    addMenuRequest.turns.push(turnRequest)
    await this.menuService.addMenu(addMenuRequest).subscribe((res:AddMenuResponse)=>
    console.log(res));
    
  }



}
