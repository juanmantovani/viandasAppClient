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
  chosePersonalize : boolean;
  cant: number = 1;
  @Output() selectCategory : EventEmitter <Category []> = new EventEmitter();
  @Output() selectPersonalize : EventEmitter <Category []> = new EventEmitter();
  @Output() viewDetailsCategory : EventEmitter <Category> = new EventEmitter();
  @Output() viewDetailsPersonalize : EventEmitter <boolean> = new EventEmitter();
  @Output() cantEmit : EventEmitter <number> = new EventEmitter();



  constructor() { }

  ngOnInit(): void {
  }
  
  onSelectCategory(cat : Category) {
    this.chosePersonalize = false;
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

  isSelectedPersonalize() : boolean{
    return this.chosePersonalize;  
  }

  onSelectPersonalize() {
    this.choseCategory = [];
    this.selectPersonalize.emit(this.categories);
    this.chosePersonalize = !this.chosePersonalize;

  }
  onViewDetailsPersonalize(){
    this.viewDetailsPersonalize.emit(true);
  }

  removeFood(category : Category){
    this.cant-=1;
    this.cantEmit.emit(this.cant);
  }

  addFood(category : Category){
    this.cant+=1;
    this.cantEmit.emit(this.cant);
  }

}
