import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/shared/services/order.service';
import { GetAllOrdersResponse } from 'src/app/shared/dto/order/GetAllOrdersResponse';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  displayedColumns: string[] = ['idOrden', 'client', 'fecha', 'total', 'actions'];
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog,
    private orderService: OrderService) { }

    ngOnInit() {
      this.getOrders();
      this.paginator._intl.itemsPerPageLabel = 'Ítems por página';
    }

    async getOrders() {
      await this.orderService.getAllOrders().subscribe((res: GetAllOrdersResponse) => {
        this.dataSource = new MatTableDataSource(res.order);
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      })
    }

    onSearch(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
