import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Client } from 'src/app/shared/models/Client';
import { ClientService } from 'src/app/shared/services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { GetClientResponse } from 'src/app/shared/dto/client/GetClientResponse';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name','phonePrimary','phoneSecondary','bornDate','email','observation','pathologies'];
  listClients: Client[];
  dataSource: any;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private clientService: ClientService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.getClient();
    this.paginator._intl.itemsPerPageLabel = 'Ítems por página';
  }

  async getClient() {
    await this.clientService.getClient().subscribe((res: GetClientResponse) => {
      this.dataSource = new MatTableDataSource(res.client);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }
  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  

}
