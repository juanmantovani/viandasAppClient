import { Component, Input, Output, OnInit,EventEmitter,SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Food } from '../../../../shared/models/Food';
import { DayFood } from '../../../../shared/models/DayFood';
import { Category } from 'src/app/shared/models/Category';
import { FoodService } from 'src/app/shared/services/food.service';
import { Observable, startWith, map } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';


@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})

export class DayComponent implements OnInit {

  @Input() daysOfMonth: any[];  // Días del mes
  @Input() lastCategory: boolean;  // Indica si es la última categoría
  @Input() category: Category;  // Categoría actual

  @Output() daysCharged: EventEmitter<DayFood[]> = new EventEmitter();
  @Output() finishCharged: EventEmitter<boolean> = new EventEmitter();

  form: FormGroup;
  listFood: Food[] = [];  // Lista completa de alimentos
  filteredFoods: Observable<Food[]>[] = [];  // Lista filtrada de alimentos por día
  foodFilterCtrls: FormControl[] = [];  // Arreglo de FormControl para cada filtro por día

  constructor(private fb: FormBuilder, private foodService: FoodService) {}

  ngOnInit() {
    this.generateForm();
    this.addDays();
    this.getFoodByCategory();
  }

  // Método para obtener alimentos por categoría
  getFoodByCategory() {
    const request = { idCategory: this.category.id };
    this.foodService.getFoodByCategory(request).subscribe((response: any) => {
      this.listFood = response.food;
    });
  }

  // Método para generar el formulario
  generateForm() {
    this.form = this.fb.group({
      days: this.fb.array([])  // FormArray para gestionar todos los días
    });
  }

  // Método para obtener los días del formulario
  get days(): FormArray {
    return this.form.get('days') as FormArray;
  }

  // Método para agregar días al formulario
  addDays() {
    this.daysOfMonth.forEach((day, index) => {
      const dayGroup = this.fb.group({
        food: new FormControl('', Validators.required),
        date: day.date,
        category: this.category
      });
      this.days.push(dayGroup);

      // Crear un filtro independiente para cada día (FormControl para el input)
      this.foodFilterCtrls[index] = new FormControl('');
      
      // Filtrar los alimentos para ese día
      this.filteredFoods[index] = this.foodFilterCtrls[index].valueChanges.pipe(
        startWith(''),
        map(value => this.filterFoods(value))
      );
    });
  }

  // Método para filtrar los alimentos
  filterFoods(value: string): Food[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : ''; // Convertimos el valor a minúsculas
    return this.listFood.filter(food => food.title.toLowerCase().includes(filterValue)); // Filtramos según el título
  }

  // Método para manejar la selección de un alimento
  onFoodSelected(food: Food, index: number) {
    this.days.at(index).get('food')?.setValue(food);
  }

  // Método para guardar los días seleccionados
  onClickSave() {
    this.daysCharged.emit(this.days.getRawValue());
    if (this.lastCategory) {
      this.finishCharged.emit(true);
    }
  }

  // Método para mostrar el nombre del alimento en el input
  displayFood(food: Food | null): string {
    return food ? food.title : '';
  }
}




