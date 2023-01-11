import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { GetClientByIdUserResponse } from 'src/app/shared/dto/client/GetClientByIdUserResponse';
import { EditDayOrderAddressRequest } from 'src/app/shared/dto/order/EditDayOrderAddressRequest';
import { EditDayOrderAddressResponse } from 'src/app/shared/dto/order/EditDayOrderAddressResponse';
import { Address } from 'src/app/shared/models/Address';
import { Client } from 'src/app/shared/models/Client';
import { DayOrder } from 'src/app/shared/models/DayOrder';
import { Order } from 'src/app/shared/models/Order';
import { ClientService } from 'src/app/shared/services/client.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { Utils } from 'src/app/utils';
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
  @Input() editAddress : boolean;

  @Output() getOrderDetails: EventEmitter<any> = new EventEmitter();

  changinAddress : DayOrder;

  public userProfile: KeycloakProfile | null;
  client : Client;
  selectAddress: Address | undefined;

  address: Address;


  constructor(
    private readonly keycloak: KeycloakService,
    private clientService : ClientService,
    private dialogService: DialogService,
    private orderService: OrderService
    ) { }

  async ngOnInit() {
    this.changinAddress = new DayOrder(null);
    this.userProfile = await this.keycloak.loadUserProfile();

  }


  getDay(date: Date): string{
    return Utils.getDayOfDate(date);
  }

 async onChangeAddress(dayOrder : DayOrder) {
    await this.getClientByIdUser(dayOrder.address.id)
    this.changinAddress.id = dayOrder.id;
  }

  async getClientByIdUser(addressId : number){
    await this.clientService.getClientByIdUser(this.userProfile?.id!).subscribe((res : GetClientByIdUserResponse) => {
      this.client = new Client(res.client);
      this.selectAddress = this.client.addresses.find(address => addressId == address.id);
    })
  }

  async onSaveChangeAddress(dayOrder: DayOrder){
    if (await this.generateConfirm("Está a punto de cambiar el domicilio de envío. ¿Está seguro de realizar esta operación?") === true)
    {
      var request: EditDayOrderAddressRequest = {
        idAddress: this.selectAddress ? this.selectAddress.id : 0,
        idDayOrder: dayOrder.id
      }
      this.orderService.editDayOrderAddress(request).subscribe((res: EditDayOrderAddressResponse) => {
        this.getOrderDetails.emit();
        this.changinAddress = new DayOrder(null);
      });

    }
  }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  removeFood(dayOrder : DayOrder){
    dayOrder.cant=dayOrder.cant-1
    this.order.total = this.order.total - dayOrder.dayFood.category.price;
  }

  addFood(dayOrder : DayOrder){
    dayOrder.cant=dayOrder.cant+1
    this.order.total = this.order.total + dayOrder.dayFood.category.price;
  }




}
