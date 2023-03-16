import { Component, OnInit, Input, Output,EventEmitter  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  default: boolean = true;
  personalizeAddresses: boolean;

  defaultSelectAddress: Address | undefined;


  constructor() {
   
  }

  ngOnInit(): void {
    this.order.observation = this.client.observation;
  }

  getDay(date: Date): string{
    return Utils.getDayOfDate(date);
  }

  onClickEditAddress() {
    this.changeAddress = !this.changeAddress;
  }

  onSelectedAddress(address: Address){
    if (address.id != this.selectedAdress.id){
    this.selectedAddressEmit.emit(address)
    this.changeAddress = false;
    }
  }

  onGetClient() {
    this.getClient.emit()
  }

  onClickPersonalizeAddresses() {
    this.default = false;
    this.defaultSelectAddress = this.client.addresses.find(address => this.selectedAdress.id == address.id);
    this.personalizeAddresses = true;

  }

  onClickSetDefaulAddress() {
    this.default = true;
    this.personalizeAddresses = false;
  }

  //busco el date recorriendo el array de daysOrder, cuando encuentro el date, asigno address y salto para no seguir en el for
  changeAddressOnDay(address: Address, date: Date){
    for (let dayOrder of this.order.daysOrder){
      if (dayOrder.dayFood.date.getTime() == date.getTime()){
        dayOrder.address = address; 
        break;
      }
    }

  }


}
