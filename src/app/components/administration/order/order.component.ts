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
import { ClientService } from 'src/app/shared/services/client.service';
import { Client } from 'src/app/shared/models/Client';
import { DataFormNote } from 'src/app/shared/dto/note/DataFormNote';
import { Note } from 'src/app/shared/models/Note';
import { Utils } from 'src/app/utils';
import { NoteFormComponent } from '../note-form/note-form.component';
import { AddNoteRequest } from 'src/app/shared/dto/note/AddNoteRequest';
import { AddNoteResponse } from 'src/app/shared/dto/note/AddNoteResponse';
import { EditNoteRequest } from 'src/app/shared/dto/note/EditNoteRequest';
import { EditNoteResponse } from 'src/app/shared/dto/note/EditNoteResponse';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  displayedColumns: string[] = ['idOrder', 'client', 'pathologies', 'observation', 'notes', 'address'];
  listTandaTable: TandaTable[] = [];
  listCategoryTable: CategoryTable[];
  date: Date;
  actionFormNote: string;
  showResult: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog,
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.date = new Date();
    this.getOrders(this.date);
  }

  onClickOk() {
    this.listTandaTable = [];
    this.listCategoryTable = [];
    this.getOrders(this.date)
  }

  async getOrders(date: Date) {
    this.displayedColumns = ['idOrder', 'client', 'pathologies', 'observation', 'notes', 'address'];
    const request: GetOrdersRequest = {
      date: date
    }
    await this.orderService.getOrders(request).subscribe((res: GetOrdersResponse) => {
      if (res.tandaTable && res.categoryTable) {
        this.listTandaTable = res.tandaTable;
        this.listCategoryTable = res.categoryTable;
        this.addColumToTable();
        this.showResult = true;
      } else {
        this.showResult = false;
      }
    })
  }

  addColumToTable() {
    if (this.listCategoryTable)

      var ordenCategorias: { [key: string]: number } = {
        "proteico": 5,
        "general": 4,
        "liviano": 3,
        "veggie": 2,
        "adecuado a patologías": 1
      };

    this.listCategoryTable.sort(function (a, b) {
      var categoriaA = a.category.title.toLowerCase();
      var categoriaB = b.category.title.toLowerCase();
      var ordenA = ordenCategorias[categoriaA];
      var ordenB = ordenCategorias[categoriaB];

      return ordenA - ordenB;
    });

    this.listCategoryTable.forEach(c => {
      this.displayedColumns.splice(2, 0, c.category.title.toLowerCase())
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

  onClickNote(client: Client) {
    var dataForm = new DataFormNote();
    if (client.note.id == 0) {
      this.actionFormNote = "Add"
      dataForm = {
        actionForm: "Add",
        note: new Note(null),
        client: client
      };
    } else {
      this.actionFormNote = "Edit"
      dataForm = {
        actionForm: "Edit",
        note: client.note,
        client: client
      };
    }
    this.gestionateForm(dataForm);
  }

  async gestionateForm(dataForm: DataFormNote) {
    const dialogConfig = Utils.matDialogConfigDefault();
    dialogConfig.data = dataForm;
    const dialogRef = this.dialog.open(NoteFormComponent, dialogConfig);
    const componentInstance = dialogRef.componentInstance;

    componentInstance.onSubmit.subscribe(async (data) => {
      if (!data) {
        dialogRef.close();
        return false;
      }

      var result: any = await this.onSubmitNote(data, dataForm.client);
      if (result) {
        return false;
      }
      else {
        dialogRef.close();
        await this.getOrders(this.date);
        return true;
      }
    })
  }

  async onSubmitNote(note: Note, client: Client) {
    const resultOperation = this.actionFormNote == "Add" ? await this.addNote(note, client) : await this.editNote(note);

    return resultOperation;
  }

  async addNote(note: Note, client: Client) {
    const addNoteRequest: AddNoteRequest = {
      note: note,
      idClient: client.id
    }

    await this.clientService.addNote(addNoteRequest).subscribe((res: AddNoteResponse) => {
      //this.getOrders(this.date);
      return res;
    }
    );
  }

  async editNote(note: Note) {
    const editNoteRequest: EditNoteRequest = {
      note: note
    }
    await this.clientService.editNote(editNoteRequest).subscribe((res: EditNoteResponse) => {
      //this.getOrders(this.date);
      return res;
    })
  }
}
