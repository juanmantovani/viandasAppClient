import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/shared/models/Category';
import { CategoryViewer } from 'src/app/shared/models/CategoryViewer';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-categories-cards',
  templateUrl: './categories-cards.component.html',
  styleUrls: ['./categories-cards.component.css']
})
export class CategoriesCardsComponent implements OnInit {
 
  @Input() categoryViewer: CategoryViewer;
  @Output() onCategory : EventEmitter <Category> = new EventEmitter();
  URLAPI = environment.urlApi;


  constructor() { 
  }

  ngOnInit(): void {
  }
  onClickCategory(){
    this.onCategory.emit(this.categoryViewer.category);

  }

}
