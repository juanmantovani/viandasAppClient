import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { TandaTable } from 'src/app/shared/models/TandaTable';
import { GetOrdersRequest } from 'src/app/shared/dto/order/GetOrdersRequest';
import { GetOrdersResponse } from 'src/app/shared/dto/order/GetOrdersResponse';
import { CategoryTable } from 'src/app/shared/models/CategoryTable';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'description', 'category', 'actions'];
  listTandaTable: TandaTable[];
  listcategoryTable : CategoryTable[];
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  async getOrders() {
    const request: GetOrdersRequest = {
      date : new Date()
    }
    await this.orderService.getOrders(request).subscribe((res: GetOrdersResponse) => {
      this.dataSource = new MatTableDataSource(res.tandaTable);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }


}
