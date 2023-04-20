import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  @Input() order : Order;

  constructor() { }

  ngOnInit(): void {
  }

}
