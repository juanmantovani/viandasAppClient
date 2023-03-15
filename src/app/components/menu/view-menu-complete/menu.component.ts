import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GetMenuResponse } from 'src/app/shared/dto/menu/getMenuResponse';
import { CategoryViewer } from 'src/app/shared/models/CategoryViewer';
import { MenuViewer } from 'src/app/shared/models/MenuViewer';
import { MenuService } from 'src/app/shared/services/menu.service';
import { Utils } from 'src/app/utils';

@Component({
  selector: 'app-view-menu-complete',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class ViewMenuCompleteComponent implements OnInit {

  @Input() menuViewer: MenuViewer;


  displayedColumns: string[] = ['date', 'foodViewer'];
  dataSource!: MatTableDataSource<CategoryViewer>;

  constructor(
    private menuService: MenuService

  ) {     
    this.dataSource = new MatTableDataSource<CategoryViewer>();
  }

  ngOnInit() {
  }
  
  getDay(date: Date): string{
    return Utils.getDayOfDate(date);
  }

}
