import { Component, OnInit, Input, Output,EventEmitter  } from '@angular/core';
import { Address } from 'src/app/shared/models/Address';
import { Client } from 'src/app/shared/models/Client';
import { Order } from 'src/app/shared/models/Order';
import { Utils } from 'src/app/utils';



@Component({
  selector: 'app-finish-order',
  templateUrl: './finish-order.component.html',
  styleUrls: ['./finish-order.component.css']
})
export class FinishOrderComponent implements OnInit {

  @Input() order : Order;
  @Input() selectedAdress : Address;
  @Input() daysOfMonth : Date[];
  @Input() client : Client;


  @Output() selectedAddressEmit: EventEmitter<Address> = new EventEmitter();
  @Output() getClient: EventEmitter<any> = new EventEmitter();


  changeAddress : boolean;

  constructor() { }

  ngOnInit(): void {

  }

  getDay(date: Date): string{
    return Utils.getDayOfDate(date);
  }

  onClickEditAddress() {
    this.changeAddress = !this.changeAddress;
  }

  selectedAddress(address: Address){
    this.selectedAddressEmit.emit(address)
  }

  onGetClient() {
    this.getClient.emit()
  }


}
