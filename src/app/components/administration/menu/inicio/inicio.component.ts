import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetCategoryResponse } from 'src/app/shared/dto/category/GetCategoryResponse';
import { Category } from 'src/app/shared/models/Category';
import { FoodService } from 'src/app/shared/services/food.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { GetFoodResponse } from 'src/app/shared/dto/food/GetFoodResponse';
import { Food } from 'src/app/shared/models/Food';


export interface User {
  name: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class MenuInicioComponent implements OnInit {

  formWeeks: FormGroup;
  formMenu: FormGroup;
  listCategories: Category[];
  listFood: Food[];

  cantWeeks: string [];
  minDateEnd: Date;
  
  myControl = new FormControl('');
  options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptions: Observable<User[]>;
  daysOfWeek: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];


  constructor(
    private foodService: FoodService,

  ) { 
    this.formWeeks = this.generateFormWeeks();
    this.cantWeeks = [];
    this.minDateEnd = new Date();
    this.formMenu = this.generateFormMenu();



  }

  ngOnInit(): void {
    this.getCategories();
    this.getFood();


    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  generateFormWeeks(): FormGroup {
    return new FormGroup({
      weeks: new FormControl('', Validators.required)
    });
  }

  async getFood() {
    await this.foodService.getFood().subscribe((res: GetFoodResponse) => {
      this.listFood = res.food;
    })
  }

  generateFormMenu(): FormGroup {
    return new FormGroup({
      dateStart: new FormControl('',Validators.required),
      dateEnd: new FormControl('', Validators.required),
    });
  }

  onClickWeeks() {
    this.cantWeeks = [];
    const CANTWEEKS = this.formWeeks.getRawValue();
    for (let i=0; i < CANTWEEKS.weeks; i++){
      this.cantWeeks.push("Semana " + (i+1).toString());
    }
  }

  onChangeDateStart(e: any) {
    const date: Date = e?.value;
    if (date) this.minDateEnd = date;
  }

  async getCategories() {
    await this.foodService.getCategories().subscribe((res: GetCategoryResponse) => {
      this.listCategories = res.listCategories;
    })
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
