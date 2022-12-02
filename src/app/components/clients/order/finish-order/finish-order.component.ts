import { Component, OnInit, Input } from '@angular/core';
import { Address } from 'src/app/shared/models/Address';
import { Client } from 'src/app/shared/models/Client';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-finish-order',
  templateUrl: './finish-order.component.html',
  styleUrls: ['./finish-order.component.css']
})
export class FinishOrderComponent implements OnInit {

  @Input() order : Order;
  @Input() favoriteAdress : Address;

  

  constructor() { }

  ngOnInit(): void {


  }

}
