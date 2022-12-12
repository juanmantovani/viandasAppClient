import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GetFoodByCategoryRequest } from 'src/app/shared/dto/food/GetFoodByCategoryRequest';
import { GetFoodResponse } from 'src/app/shared/dto/food/GetFoodResponse';
import { EditMenuRequest } from 'src/app/shared/dto/menu/EditMenuRequest';
import { GetDayRequest } from 'src/app/shared/dto/menu/GetDaysRequest';
import { GetDayResponse } from 'src/app/shared/dto/menu/GetDaysResponse';
import { DayFood } from 'src/app/shared/models/DayFood';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from 'src/app/shared/services/food.service';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  displayedColumns: string[] = ['date', 'food', 'category', 'actions'];
  dataSource!: MatTableDataSource<DayFood>;
  date: Date;
  listDay: DayFood[];
  viewDay: boolean;
  viewFood: boolean;
  listFood: Food[];
  food: Food;
  day : DayFood;
  existFoodInDay: boolean = true;

  @Output() onSubmit: EventEmitter<EditMenuRequest | null>;

  constructor(private menuService: MenuService,
    private foodService: FoodService,
    public dialogRef: MatDialogRef<EditMenuComponent>) {
    this.onSubmit = new EventEmitter<EditMenuRequest | null>();
  }

  ngOnInit(): void {
  }

  async onClickOk() {
    this.viewDay = false;
    this.dataSource = new MatTableDataSource();

    const request: GetDayRequest = {
      date: this.date
    }

    await this.menuService.getDayMenu(request).subscribe((res: GetDayResponse) => {
      if ( res.days && res.days.length > 0) {
        this.dataSource = new MatTableDataSource(res.days);
        this.viewDay = true;
        this.existFoodInDay = true;
      } else {
          this.existFoodInDay = false;
        }
    })
  }

  onClickCancel() {
    this.dialogRef.close();
  }

  async onClickChange(day: DayFood) {
    this.day = day;
    const request: GetFoodByCategoryRequest = {
      idCategory: day.category.id
    }

    await this.foodService.getFoodByCategory(request).subscribe((res: GetFoodResponse) => {
      this.listFood = res.food;
      this.viewFood = true;
    })
  }


  onClickSave() {
    const request: EditMenuRequest = {
      idDayFood: this.day.id,
      idFood : this.food.id,
      idCategory : this.day.category.id
    }
    this.onSubmit.emit(request);
  }


}
