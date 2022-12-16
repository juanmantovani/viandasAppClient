import { Component, OnInit, Injectable, NgModule } from '@angular/core';
import { GetOrderByIdResponse } from 'src/app/shared/dto/order/GetOrderByIdResponse';
import { GetOrderViewerResponse } from 'src/app/shared/dto/order/GetOrderViewerResponse';
import { Order } from 'src/app/shared/models/Order';
import { OrderViewer } from 'src/app/shared/models/OrderViewer';
import { OrderService } from 'src/app/shared/services/order.service';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-inicio-orders',
  templateUrl: './inicio-orders.component.html',
  styleUrls: ['./inicio-orders.component.css']
})
export class InicioOrdersComponent implements OnInit,  MatPaginatorIntl  {
  
  ordersViewer : OrderViewer[];
  orderDetails: Order;

  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`First page`;
  itemsPerPageLabel = $localize`Items per page:`;
  lastPageLabel = $localize`Last page`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';

  constructor(private orderService: OrderService,
    ) {
      this.orderDetails = new Order(null);
     }

  ngOnInit(): void {
    this.getOrderViewer();

  }
  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Page ${page + 1} of ${amountPages}`;
  }


  async getOrderViewer() {
    await this.orderService.getOrderViewer().subscribe((res: GetOrderViewerResponse) => {
      this.ordersViewer = res.orderViewer;
    }) 
  }

  async onViewDetailsOrder(idOrder : number) {
    await this.orderService.getOrderById(idOrder).subscribe((res: GetOrderByIdResponse) => {
      this.orderDetails = res.order;
    }) 
  }

  onHideDetailsOrder(idOrder : number) {
    this.orderDetails = new Order(null);
  }

}
