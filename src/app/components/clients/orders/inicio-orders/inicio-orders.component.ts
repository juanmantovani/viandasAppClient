import { Component, OnInit, Injectable, NgModule, ViewChild } from '@angular/core';
import { GetOrderByIdResponse } from 'src/app/shared/dto/order/GetOrderByIdResponse';
import { GetOrderViewerResponse } from 'src/app/shared/dto/order/GetOrderViewerResponse';
import { Order } from 'src/app/shared/models/Order';
import { OrderViewer } from 'src/app/shared/models/OrderViewer';
import { OrderService } from 'src/app/shared/services/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inicio-orders',
  templateUrl: './inicio-orders.component.html',
  styleUrls: ['./inicio-orders.component.css']
})
export class InicioOrdersComponent implements OnInit  {
  
  ordersViewer : OrderViewer[];
  orderDetails: Order;
  textWhatsApp: string = 'https://api.whatsapp.com/send?phone=5493434549868&text=';

  @ViewChild(MatPaginator) paginator?:MatPaginator;

  constructor(private orderService: OrderService, public datepipe: DatePipe
    ) {
      this.orderDetails = new Order(null);
     }

  ngOnInit(): void {
    this.getOrderViewer();

  }

  async getOrderViewer() {
    await this.orderService.getOrderViewer().subscribe((res: GetOrderViewerResponse) => {
      this.ordersViewer = res.orderViewer;
    }) 
  }

  async onViewDetailsOrder(idOrder : number) {
    await this.orderService.getOrderById(idOrder).subscribe((res: GetOrderByIdResponse) => {
      this.orderDetails = res.order;
      this.textWhatsApp = this.textWhatsApp + 'Hola, ' + 'mi nombre es ' + this.orderDetails.client.name + ' ' + this.orderDetails.client.lastName + ' y realicé el pedido número ' + this.orderDetails.id + ' el ' + this.datepipe.transform(this.orderDetails.date, 'dd/MM') + ' por el total de $' + this.orderDetails.total;
    }) 
  }

  onHideDetailsOrder(idOrder : number) {
    this.orderDetails = new Order(null);
  }

  async onGetOrderDetails(){
    await this.onViewDetailsOrder(this.orderDetails.id)

  }

  onClickSendWhatsApp(){
    window.open(this.textWhatsApp, '_blank');
    
  }

}
