import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Client } from 'src/app/shared/models/Client';
import { ClientService } from 'src/app/shared/services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { GetClientResponse } from 'src/app/shared/dto/client/GetClientResponse';
import { Note } from 'src/app/shared/models/Note';
import { DataFormNote } from 'src/app/shared/dto/note/DataFormNote';
import { Utils } from 'src/app/utils';
import { NoteFormComponent } from '../note-form/note-form.component';
import { AddNoteRequest } from 'src/app/shared/dto/note/AddNoteRequest';
import { AddNoteResponse } from 'src/app/shared/dto/note/AddNoteResponse';
import { EditNoteRequest } from 'src/app/shared/dto/note/EditNoteRequest';
import { EditNoteResponse } from 'src/app/shared/dto/note/EditNoteResponse';



@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'phonePrimary', 'observation','note', 'pathologies', 'actions'];
  listClients: Client[];
  dataSource: any;
  clientSelected: Client;
  viewOrdersClient: boolean;
  actionFormNote: string;



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;

  constructor(
    private clientService: ClientService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.getClient();
    if (this.viewOrdersClient)
      this.paginator._intl.itemsPerPageLabel = 'Ítems por página';
  }

  async getClient() {
    await this.clientService.getClient().subscribe((res: GetClientResponse) => {
      this.dataSource = new MatTableDataSource(res.client);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.matSort
    })
  }
  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onClickShowOrders(client: Client) {
    this.clientSelected = client;
    this.viewOrdersClient = true;
  }

  onClickBack() {
    this.viewOrdersClient = false;
  }

  onClickNote(client: Client) {
    var dataForm = new DataFormNote();
    if (client.note.id== 0) {
      this.actionFormNote = "Add"
      dataForm = {
        actionForm: "Add",
        note: new Note(null),
        client : client
      };
    } else {
      this.actionFormNote = "Edit"
      dataForm = {
        actionForm: "Edit",
        note: client.note,
        client : client
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

      var result: any = await this.onSubmitNote(data,dataForm.client);
      if (result) {
        return false;
      }
      else {
        dialogRef.close();
        await this.getClient();
        return true;
      }
    })
  }

  async onSubmitNote(note: Note, client : Client) {
    const resultOperation = this.actionFormNote == "Add" ? await this.addNote(note,client) : await this.editNote(note);

    return resultOperation;
  }

  async addNote(note: Note, client : Client) {
    const addNoteRequest: AddNoteRequest = {
      note: note,
      idClient: client.id
    }

    await this.clientService.addNote(addNoteRequest).subscribe((res: AddNoteResponse) => {
      this.getClient()
      return res;
    }
    );
  }

  async editNote(note: Note) {
    const editNoteRequest: EditNoteRequest = {
      note: note
    }
    await this.clientService.editNote(editNoteRequest).subscribe((res: EditNoteResponse) => {
      this.getClient()
      return res;
    })
  }



}
