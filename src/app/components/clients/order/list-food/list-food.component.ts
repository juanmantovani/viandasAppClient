import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.css']
})
export class OrderListFoodComponent implements OnInit {

  URLAPI = environment.urlApi;
  value = 1;

  
  @Input() order : Order;


  constructor() { }

  ngOnInit(): void {
  }

}
