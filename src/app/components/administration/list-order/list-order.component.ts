import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/shared/services/order.service';
import { GetAllOrdersResponse } from 'src/app/shared/dto/order/GetAllOrdersResponse';
import { GetAllOrdersRequest } from 'src/app/shared/dto/order/GetAllOrdersRequest';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  displayedColumns: string[] = ['idOrden', 'client', 'date', 'total', 'actions'];
  dataSource: any;
  request : GetAllOrdersRequest

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog,
    private orderService: OrderService) { 
      this.request = {
        dateEnd : new Date(),
        dateStart : new Date(),
        paid : false,
        status : true
      }
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

    onClickSearch(){
      this.getOrders();
    }

    onSearch(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
