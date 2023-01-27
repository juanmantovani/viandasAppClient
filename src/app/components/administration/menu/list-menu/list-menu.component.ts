import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Menu } from 'src/app/shared/models/Menu';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export class ListMenuComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'start', 'end', 'actions'];

  @Input() dataSource : MatTableDataSource<Menu>;
  @Output() deleteMenu : EventEmitter <Menu> = new EventEmitter();
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

 async onClickDelete(menu: Menu) {
    if (await this.generateConfirm("Está a punto de eliminar un registro. ¿Está seguro de realizar esta operación?") === true) {
      await this.deleteMenu.emit(menu);
    }
    }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async onClickViewMenu(menu: Menu){
    await this.menuId.emit(menu.id);
  }



}
