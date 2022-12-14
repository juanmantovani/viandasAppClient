import { Component, OnInit, Input, Output,EventEmitter  } from '@angular/core';
import { Address } from 'src/app/shared/models/Address';
import { Client } from 'src/app/shared/models/Client';
import { Order } from 'src/app/shared/models/Order';
import { Utils } from 'src/app/utils';
import { SelectAddressComponent } from '../select-address/select-address.component';



@Component({
  selector: 'app-finish-order',
  templateUrl: './finish-order.component.html',
  styleUrls: ['./finish-order.component.css']
})
export class FinishOrderComponent implements OnInit {

  @Input() order : Order;
  @Input() selectedAdress : Address;
  @Input() daysOfMonth : Date[];

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
    this.changeAddress = true;
  }

  selectedAddress(address: Address){
    this.selectedAddressEmit.emit(address)
  }

  onGetClient() {
    console.log("acá si")
    this.getClient.emit()
  }


}
