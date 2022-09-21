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
  @Input() lastCategory: boolean;

  @Output() daysCharged : EventEmitter <Day[]> = new EventEmitter();
  @Output() finishCharged : EventEmitter <boolean> = new EventEmitter();

  viewForm: boolean = false;
  form: FormGroup;

  constructor( private fb: FormBuilder ) {
  }

  ngOnInit(): void {
    this.generateForm();
    this.addDays();
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

  onClickSave(){  
    this.daysCharged.emit(this.days.getRawValue())
    if (this.lastCategory){
      this.finishCharged.emit(true);
    }
    
  }
}
