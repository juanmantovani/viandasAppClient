import { Component, OnInit, Input, Output,EventEmitter  } from '@angular/core';
import { GetAddressTakeAwayResponse } from 'src/app/shared/dto/setting/GetAddressTakeAwayResponse';
import { Address } from 'src/app/shared/models/Address';
import { Client } from 'src/app/shared/models/Client';
import { Order } from 'src/app/shared/models/Order';
import { SettingService } from 'src/app/shared/services/setting.service';
import { Utils } from 'src/app/utils';

@Component({
  selector: 'app-selected-address',
  templateUrl: './selected-address.component.html',
  styleUrls: ['./selected-address.component.css']
})
export class SelectedAddressComponent implements OnInit {

  @Input() order : Order;
  @Input() selectedAdress : Address;
  @Input() daysOfMonth : Date[];
  @Input() client : Client;

  @Output() selectedAddressEmit: EventEmitter<Address> = new EventEmitter();
  @Output() getClient: EventEmitter<any> = new EventEmitter();

  changeAddress : boolean;
  default: boolean = true;
  personalizeAddresses: boolean;
  takeAwayAll: boolean;
  addressTakeAway : Address;
  defaultSelectAddress: Address | undefined;
  orderWithDefaultAddress : Order

  constructor(private settingService : SettingService ) {  }

  ngOnInit(): void {
    this.order.observation = this.client.observation;
    this.getAddressTakeAway();
    this.orderWithDefaultAddress = JSON.parse(JSON.stringify(this.order));
  }

  getDay(date: Date): string{
    return Utils.getDayOfDate(date);
  }

  getAddressTakeAway(){
    this.settingService.getAddressTakeAway().subscribe((res: GetAddressTakeAwayResponse) => {
      this.addressTakeAway = res.address;
    })
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
    this.takeAwayAll = false;
    this.defaultSelectAddress = this.client.addresses.find(address => this.selectedAdress.id == address.id);
    this.personalizeAddresses = true;

  }
  onClickTakeAwayAll(){
    this.personalizeAddresses = false;
    this.default = false;
    this.order.daysOrder.filter(order => order.address = this.addressTakeAway)
  }

  onClickSetDefaulAddress() {
    this.default = true;
    this.personalizeAddresses = false;
    this.takeAwayAll = false;
    this.order = JSON.parse(JSON.stringify(this.orderWithDefaultAddress));
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
