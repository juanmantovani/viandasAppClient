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

  displayedColumns: string[] = ['idOrder', 'client', 'address', 'observation'];
  listTandaTable: TandaTable[];
  listCategoryTable: CategoryTable[];
  date: Date;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.date = new Date();
    this.getOrders(this.date);
  }

  onClickOk(){
    this.listTandaTable = [];
    this.listCategoryTable = [];
    this.displayedColumns = ['idOrder', 'client', 'address', 'observation'];
    this.getOrders(this.date) 
  }

  async getOrders(date : Date) {
    const request: GetOrdersRequest = {
      date: date
    }
    await this.orderService.getOrders(request).subscribe((res: GetOrdersResponse) => {
      this.listTandaTable = res.tandaTable;
      this.listCategoryTable = res.categoryTable;
      this.addColumToTable();
    })
  }

  addColumToTable() {
    if (this.listCategoryTable)
      this.listCategoryTable.forEach(c => {
        this.displayedColumns.push(c.category.title.toLowerCase())
      })
  }

  getSubTotal(idCategory: number, tandaTable: TandaTable) {
    var cant;
    tandaTable.categoryTable.forEach(c => {
      if (c.category.id == idCategory)
        cant = c.cant
    })
    return cant;
  }
}
