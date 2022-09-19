import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Day } from 'src/app/shared/models/Day';
import { Menu } from 'src/app/shared/models/Menu';
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

  
  @Input() listCategories: Category[];
  @Input() rangeOfDate: FormGroup;

  listFood: Food[];
  listFoodByCategory: Food[];

  menu: Menu;
  WEEKDAY = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  daysOfMonth: any [];

  viewDays: boolean = false;



  selectedIndexMatTab: number;

  constructor(
    private foodService: FoodService,
  ) { 
    this.listFood = [];
    this.listFoodByCategory = [];
    this.selectedIndexMatTab = 0;
    this.daysOfMonth = [];
    this.menu = new Menu(null);

  }

  ngOnInit(): void {
    this.getFood();
    this.setDaysOfMonth();

  }

  ngAfterViewInit(): void {
    this.viewDays = true;

  }

  async getFood() {
    await this.foodService.getFood().subscribe((res: GetFoodResponse) => {
      this.listFood = res.food;
    })
  }

  filterFoodByCategory(category : string) : Food[] {
    return this.listFood.filter(food => 
      {
       return food.category.description == category;
      });
  }

  getDays(days: Day[]){
    // const MENU = {
    //   turnId: 1,
    //   days: days
    // }
    // this.menu = new Menu(MENU);
    this.menu.turnId = 1;
    
     const CANTDAYOFMONTH = this.daysOfMonth.length;
     for (let i = 0; i < CANTDAYOFMONTH; i++){
      if (this.menu.days[i] == null){
       this.menu.days[i] = new Day(days[i]);
      }else {
       this.menu.days[i].foodId.push(days[i].foodId[0]);
      }
     }
    // // this.menuuu.push(new Menu (menu));
     this.selectedIndexMatTab = this.selectedIndexMatTab + 1; 
    console.log(this.menu);

  }

  setDaysOfMonth(){
    let dateStart : Date; 
    let dateEnd: Date;
    dateStart = this.rangeOfDate.getRawValue().start;
    dateEnd = this.rangeOfDate.getRawValue().end;
    const CANTDAYS = (dateEnd?.getTime() - dateStart?.getTime())/(1000*60*60*24)+1;
    let currentDate = new Date(dateStart);
    let currentDay : string;
    for(let i = 0; i < CANTDAYS; i++){
      currentDay = this.WEEKDAY[dateStart.getDay()];
      if (currentDay != 'Sábado' && currentDay != 'Domingo'){     
        const ITEM = ({
          date: currentDate, 
          day: currentDay 
        })
        this.daysOfMonth.push(ITEM);
    }
      currentDate = new Date(dateStart.setDate(dateStart.getDate() + 1));
    }
  }
}
