import { Component, OnInit, Injectable, NgModule, ViewChild, Input } from '@angular/core';
import { GetOrderByIdResponse } from 'src/app/shared/dto/order/GetOrderByIdResponse';
import { GetOrderViewerResponse } from 'src/app/shared/dto/order/GetOrderViewerResponse';
import { Order } from 'src/app/shared/models/Order';
import { OrderViewer } from 'src/app/shared/models/OrderViewer';
import { OrderService } from 'src/app/shared/services/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { Client } from 'src/app/shared/models/Client';

@Component({
  selector: 'app-inicio-orders',
  templateUrl: './inicio-orders.component.html',
  styleUrls: ['./inicio-orders.component.css']
})
export class InicioOrdersComponent implements OnInit {

  @Input() clientSelected: Client;
  ordersViewer: OrderViewer[];
  orderDetails: Order;
  showOrdersForAdmin: boolean;

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private orderService: OrderService,
  ) {
    this.orderDetails = new Order(null);
  }

  ngOnInit(): void {
    if (this.clientSelected) {
      this.showOrdersForAdmin = true;
    }
    this.getOrderViewer();
  }

  async getOrderViewer() {
    if (!this.clientSelected) {
      await this.orderService.getOrderViewer().subscribe((res: GetOrderViewerResponse) => {
        this.ordersViewer = res.orderViewer;
      })
    }else{
      await this.orderService.getOrderViewerByClient(this.clientSelected.id).subscribe((res: GetOrderViewerResponse) => {
        this.ordersViewer = res.orderViewer;
      })
    }
  }

  async onViewDetailsOrder(idOrder: number) {
    await this.orderService.getOrderById(idOrder).subscribe((res: GetOrderByIdResponse) => {
      this.orderDetails = res.order;
    })
  }

  onHideDetailsOrder(idOrder: number) {
    this.orderDetails = new Order(null);
  }

  async onGetOrderDetails() {
    await this.onViewDetailsOrder(this.orderDetails.id)

  }

}
