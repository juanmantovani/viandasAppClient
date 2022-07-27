import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Banner } from 'src/app/shared/models/Banner';
import { CarrouselService } from 'src/app/shared/service/carrousel.service';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {

  displayedColumns: string[] = ['titulo', 'desde', 'hasta','acciones']
  dataSource!: MatTableDataSource<Banner>;
  
@ViewChild(MatPaginator, {static: true}) paginator:MatPaginator;
@ViewChild(MatSort, {static:true}) sort: MatSort;

  constructor(
    private carrouselService: CarrouselService, 
  ) {     }

   async ngOnInit() {
    await this.obtenerBanners();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel="Ítems por página";

     
  }

  async obtenerBanners (){
    const data = await this.carrouselService.obtenerBanners();
    this.dataSource = new MatTableDataSource(data)
  }

  onBuscar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClickAgregar(){
    console.log("Vas a agregar uno")
  }

}
