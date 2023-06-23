import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { GetClientByIdUserResponse } from 'src/app/shared/dto/client/GetClientByIdUserResponse';
import { CancelDayOrderRequest } from 'src/app/shared/dto/order/CancelDayOrderRequest';
import { EditDayOrderAddressRequest } from 'src/app/shared/dto/order/EditDayOrderAddressRequest';
import { EditDayOrderAddressResponse } from 'src/app/shared/dto/order/EditDayOrderAddressResponse';
import { GetAddressTakeAwayResponse } from 'src/app/shared/dto/setting/GetAddressTakeAwayResponse';
import { Address } from 'src/app/shared/models/Address';
import { Client } from 'src/app/shared/models/Client';
import { DayOrder } from 'src/app/shared/models/DayOrder';
import { Order } from 'src/app/shared/models/Order';
import { AddressService } from 'src/app/shared/services/address.service';
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
export class OrderListFoodComponent implements OnInit, OnChanges {

  URLAPI = environment.urlApi;
  value = 1;
  today : Date = new Date();

  @Input() order: Order;
  @Input() editAddress: boolean;
  @Input() clientSelected: Client;
  @Input() daysOfMonth: Date[];

  @Output() getOrderDetails: EventEmitter<any> = new EventEmitter();
  @Output() canceledDayOrder: EventEmitter<number> = new EventEmitter();
  @Output() disableNextButton: EventEmitter<boolean> = new EventEmitter();

  changinAddress: DayOrder;

  public userProfile: KeycloakProfile | null;
  client: Client;
  selectAddress: Address | undefined;
  changeAddress: boolean = true;
  addressTakeAway: Address;
  address: Address;
  cantFoods: number = 0;

  constructor(
    private readonly keycloak: KeycloakService,
    private clientService: ClientService,
    private dialogService: DialogService,
    private orderService: OrderService,
    public datepipe: DatePipe,
    private addressService: AddressService
  ) {
    this.addressTakeAway = new Address();
  }

  async ngOnInit() {
    this.changinAddress = new DayOrder(null);
    this.userProfile = await this.keycloak.loadUserProfile();
    if (this.clientSelected) {
      this.changeAddress = false;
    }
    if (this.clientService.getClientPersonified()){
      this.changeAddress = true
    }
    if(!this.daysOfMonth) {
      this.daysOfMonth = [];
      this.inicialiceDaysOfMonth();
    }

  }

  inicialiceDaysOfMonth(){
    this.order.daysOrder.forEach(DayOrder => {
      if (!this.existDate(this.daysOfMonth, DayOrder.dayFood.date)) {
        this.daysOfMonth.push(new Date(DayOrder.dayFood.date));
        this.daysOfMonth.sort((a,b)=>a.getTime()-b.getTime());
      }
    })
  }

  existDate(array: any, fecha: Date) {
    return array.some((f: any) => {
      return f.getTime() === fecha.getTime();
    });
  }

  ngOnChanges() {
    this.cantFoods = 0;
    setTimeout(() => {
      this.countCantFoods();
    })
  }

  countCantFoods(){
    this.order.daysOrder?.forEach((dayOrder: DayOrder) => {
      this.cantFoods += dayOrder.cant;
    })
    this.evaluateDisableNextButton();
  }

  evaluateDisableNextButton(){
    if(this.cantFoods <= 0) {
      this.disableNextButton.emit(true);
    } else {
      this.disableNextButton.emit(false);
    }
  }

  getAddressTakeAway() {
    this.addressService.getAddressTakeAway().subscribe((res: GetAddressTakeAwayResponse) => {
      this.addressTakeAway = res.address;
    })
  }

  getDay(date: Date): string {
    return Utils.getDayOfDate(date);
  }

  async onChangeAddress(dayOrder: DayOrder) {
    await this.getClientByIdUser(dayOrder.address.id);
    this.changinAddress.id = dayOrder.id;
    this.getAddressTakeAway();
  }

  async getClientByIdUser(addressId: number) {
    await this.clientService.getClientByIdUser(this.userProfile?.id!).subscribe((res: GetClientByIdUserResponse) => {
      this.client = new Client(res.client);
      this.selectAddress = this.client.addresses.find(address => addressId == address.id);
    })
  }

  async onSaveChangeAddress(dayOrder: DayOrder) {
    if (await this.generateConfirm("Está a punto de cambiar el domicilio de envío. ¿Está seguro de realizar esta operación?") === true) {
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

  removeFood(dayOrder: DayOrder) {
    dayOrder.cant = dayOrder.cant - 1
    this.cantFoods -=1;
    this.evaluateDisableNextButton();
  }

  addFood(dayOrder: DayOrder) {
    dayOrder.cant = dayOrder.cant + 1
    this.cantFoods +=1;
    this.evaluateDisableNextButton();
  }

  async onCancelDayOrder(dayOrder: DayOrder, idOrder:number) {
    if (await this.generateConfirm("Está a punto de cancelar el pedido del día " + this.datepipe.transform(dayOrder.dayFood.date, 'dd/MM') + ". ¿Está seguro de realizar esta operación?") === true) {
      await this.cancelDayOrder(dayOrder.id, idOrder);
    }
  }


  async cancelDayOrder(idDayOrder: number, idOrder: number) {
    const request: CancelDayOrderRequest = {
      idDayOrder: idDayOrder
    }
    await this.orderService.cancelDayOrder(request).subscribe(() => {
      this.canceledDayOrder.emit(idOrder);
    });
  }





}
