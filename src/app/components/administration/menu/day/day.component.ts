import { Component, Input, Output, OnInit,EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Food } from '../../../../shared/models/Food';
import { map, Observable, startWith } from 'rxjs';
import { Day } from '../../../../shared/models/Day';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input() listFood: Food[];
  @Input() daysOfMonthh: any[];
  @Output() daysCharged : EventEmitter <Day[]> = new EventEmitter();
  viewForm: boolean = false;

  filteredOptions: Observable<Food[]>;
  form: FormGroup;

  constructor( private fb: FormBuilder ) {
  }

  ngOnInit(): void {
    this.generateForm();
    this.addDays();

    this.filteredOptions = this.form.controls['days'].valueChanges.pipe(
    startWith(''),
    map(value => {
      const title = typeof value.title === 'string' ? value?.id : value?.title;
      return title ? this._filter(title as string) : this.listFood.slice();
    }),
    );
 
  }

  displayFn(food: Food): string {
    return food && food.title ? food.title : '';
  }

  generateForm() {
    this.form = this.fb.group({
      days : this.fb.array([])
    });
  }

  addDays () {
    this.daysOfMonthh.forEach( value => {
      const day = this.fb.group({
        food: new FormControl('', Validators.required),
        date : value.date
      })
      this.days.push(day);
    })
  }

  get days(): FormArray {
    return this.form.get('days') as FormArray;
  }

  private _filter(title: string): Food[] {
    const filterValue = title?.toLowerCase();
    return this.listFood.filter(option => option.title.toLowerCase().includes(filterValue));
  }

  onClickSave(){  
    this.daysCharged.emit(this.days.getRawValue())
  }
}
