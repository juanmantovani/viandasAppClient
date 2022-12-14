import { Component, OnInit } from '@angular/core';
import { GetOrderViewerResponse } from 'src/app/shared/dto/order/GetOrderViewerResponse';
import { OrderViewer } from 'src/app/shared/models/OrderViewer';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-inicio-orders',
  templateUrl: './inicio-orders.component.html',
  styleUrls: ['./inicio-orders.component.css']
})
export class InicioOrdersComponent implements OnInit {
  orders : OrderViewer[];

  constructor(private orderService: OrderService,
    ) { }

  ngOnInit(): void {
    this.getOrderViewer();

  }

  async getOrderViewer() {
    await this.orderService.getOrderViewer().subscribe((res: GetOrderViewerResponse) => {
      this.orders = res.orderViewer;
    }) }
  
    onViewDetailsOrder(order : any) {

    }

}
