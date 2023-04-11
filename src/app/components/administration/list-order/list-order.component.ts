import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/shared/services/order.service';
import { GetAllOrdersResponse } from 'src/app/shared/dto/order/GetAllOrdersResponse';
import { GetAllOrdersRequest } from 'src/app/shared/dto/order/GetAllOrdersRequest';
import { OrderTable } from 'src/app/shared/models/OrderTable';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { DeleteOrderRequest } from 'src/app/shared/dto/order/DeleteOrderRequest';
import { PaidOrderRequest } from 'src/app/shared/dto/order/PaidOrderRequest';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  displayedColumns: string[] = ['idOrden', 'client', 'date', 'total','status','paid', 'actions'];
  dataSource: any;
  request: GetAllOrdersRequest

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog,
    private orderService: OrderService,
    private dialogService: DialogService) {
    this.reset()
  }

  ngOnInit() {
    this.getOrders();
    this.paginator._intl.itemsPerPageLabel = 'Ítems por página';
  }

  async getOrders() {
    await this.orderService.getAllOrders(this.request).subscribe((res: GetAllOrdersResponse) => {
      this.dataSource = new MatTableDataSource(res.order);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  onClickSearch() {
    this.getOrders();
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reset() {
    this.request = {
      dateStart: null,
      dateEnd: null,
      paid: false,
      notPaid: true,
      active: true,
      cancel: false,
      finished: false,
    }
    this.getOrders();

  }

  async onClickCancel(order: OrderTable) {
    if ( await this.generateConfirm("Está a punto de cancelar la orden " + order.id + " de " + order.client.name + " " + order.client.lastName + ". ¿Está seguro de realizar esta operación?") === true) {
      this.cancelOrder(order.id);
    }
  }

  async onClickPaid(order: OrderTable) {
    if ( await this.generateConfirm("Está a punto de registrar como pagada la orden " + order.id + " de " + order.client.name + " " + order.client.lastName + ". ¿Está seguro de realizar esta operación?") === true) {
      this.paidOrder(order.id);
    }
  }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  async cancelOrder(idOrder: number) {
    const request: DeleteOrderRequest = {
      idOrder: idOrder
    }
    await this.orderService.cancelOrder(request).subscribe(() => {
      this.getOrders();
    });
  }

  async paidOrder(idOrder: number) {
    const request: PaidOrderRequest = {
      idOrder: idOrder
    }
    await this.orderService.paidOrder(request).subscribe(() => {
      this.getOrders();
    });
  }
}
