import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddMenuRequest } from 'src/app/shared/dto/menu/AddMenuRequest';
import { AddMenuResponse } from 'src/app/shared/dto/menu/AddMenuResponse';
import { DayRequest } from 'src/app/shared/dto/menu/DayRequest';
import { Day } from 'src/app/shared/models/Day';
import { Menu } from 'src/app/shared/models/Menu';
import { Turn } from 'src/app/shared/models/Turn';
import { TurnRequest } from 'src/app/shared/models/TurnRequest';
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
  @Input() listCategories: Category[];
  @Input() rangeOfDate: FormGroup;

  listFood: Food[];

  turn: Turn;
  WEEKDAY = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  daysOfMonth: any [];

  viewDays: boolean = false;
  dateStart : Date; 
  dateEnd: Date;

  selectedIndexMatTab: number;

  constructor(
    private foodService: FoodService, private menuService: MenuService
  ) { 
    this.listFood = [];
    this.selectedIndexMatTab = 0;
    this.daysOfMonth = [];
    this.turn = new Turn(null);
  }

  ngOnInit(): void {
    this.getFood();
    this.setDaysOfMonth();
    this.dateStart = this.rangeOfDate.getRawValue().start;
    this.dateEnd = this.rangeOfDate.getRawValue().end;

  }

  ngAfterViewInit(): void {
    this.viewDays = true;

  }

  async getFood() {
    await this.foodService.getFood().subscribe((res: GetFoodResponse) => {
      this.listFood = res.food;
    })
  }

  filterFoodByCategory(category : Category) : Food[] {
    return this.listFood.filter(food => 
      {
       return food.category.id == category.id;
      });
  }

  getDays(days: Day[]){
    if(this.turn.days == undefined)
      this.turn.days = days
    else
    this.turn.days = this.turn.days.concat(days)
    this.selectedIndexMatTab = this.selectedIndexMatTab + 1;
    }
    
    async addMenu(event: boolean) {
      
      const turnRequest : TurnRequest = {
        dateEnd: this.dateEnd,
        dateStart: this.dateStart,
        id: 1,
        days: []
      };
      this.turn.days.forEach(day => {
          const dayRequest : DayRequest = {
            date: day.date,
            idFood: day.food.id    
          }
          turnRequest.days.push(dayRequest)
        })
        const addMenuRequest : AddMenuRequest = {
          turns: []
        };
        addMenuRequest.turns.push(turnRequest)

      await this.menuService.addMenu(addMenuRequest).subscribe((res:AddMenuResponse)=>
      console.log(res));
    }
    

  setDaysOfMonth(){
    this.dateStart = this.rangeOfDate.getRawValue().start;
    this.dateEnd = this.rangeOfDate.getRawValue().end;
    const CANTDAYS = (this.dateEnd?.getTime() - this.dateStart?.getTime())/(1000*60*60*24)+1;
    let currentDate = new Date(this.dateStart);
    let currentDay : string;
    for(let i = 0; i < CANTDAYS; i++){
      currentDay = this.WEEKDAY[this.dateStart.getDay()];
      if (currentDay != 'Sábado' && currentDay != 'Domingo'){     
        const ITEM = ({
          date: currentDate, 
          day: currentDay 
        })
        this.daysOfMonth.push(ITEM);
    }
      currentDate = new Date(this.dateStart.setDate(this.dateStart.getDate() + 1));
    }
  }
}
