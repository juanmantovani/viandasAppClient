import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/shared/models/Category';

@Component({
  selector: 'app-order-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class OrderCategoriesComponent implements OnInit {

  @Input() categories : Category[];
  choseCategory : Category[] = [];
  @Output() selectCategory : EventEmitter <Category []> = new EventEmitter();
  @Output() viewDetailsCategory : EventEmitter <Category> = new EventEmitter();



  constructor() { }

  ngOnInit(): void {
  }
  
  onSelectCategory(cat : Category) {
    if (this.isSelectedCategory(cat)){
      this.choseCategory = this.choseCategory.filter(category => category != cat)
    } else {
      this.choseCategory.push(cat);
    }
    this.selectCategory.emit(this.choseCategory);
  }

  onViewDetailsCategory(cat : Category) {
    this.viewDetailsCategory.emit(cat);
  }

  isSelectedCategory(category : Category) : boolean{
    return this.choseCategory.includes(category);  
  }

}
