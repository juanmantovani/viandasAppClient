import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MenuList } from 'src/app/shared/models/MenuList';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export class ListMenuComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'start', 'end', 'actions', 'activeMenu'];

  @Input() dataSource : MatTableDataSource<MenuList>;
  @Output() deleteMenu : EventEmitter <MenuList> = new EventEmitter();
  @Output() menuId : EventEmitter <number> = new EventEmitter();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private dialogService: DialogService
    )
    { }

  ngOnInit(): void {
  }

 async onClickDelete(menuList: MenuList) {
    if (await this.generateConfirm("Está a punto de eliminar un registro. ¿Está seguro de realizar esta operación?") === true) {
      await this.deleteMenu.emit(menuList);
    }
    }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async onClickViewMenu(menuList: MenuList){
    await this.menuId.emit(menuList.menuId);
  }



}
