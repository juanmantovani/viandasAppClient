import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { TandaService } from 'src/app/shared/services/tanda.service';
import { GetTandaResponse } from 'src/app/shared/dto/tanda/GetTandaResponse';
import { Tanda } from 'src/app/shared/models/Tanda';
import { DeliveryDriver } from 'src/app/shared/models/DeliveryDriver';
import { GetDeliveryDriverResponse } from 'src/app/shared/dto/deliveryDriver/GetDeliveryDriverResponse';
import { DeliveryDriverService } from 'src/app/shared/services/delivery-driver.service';
import { DataFormTanda } from 'src/app/shared/dto/tanda/DataFormTanda';
import { DeleteTandaRequest } from 'src/app/shared/dto/tanda/DeleteTandaRequest';
import { Utils } from 'src/app/utils';
import { TandaFormComponent } from '../tanda-form/tanda-form.component';
import { AddTandaRequest } from 'src/app/shared/dto/tanda/AddTandaRequest';
import { AddTandaResponse } from 'src/app/shared/dto/tanda/AddTandaResponse';
import { EditTandaRequest } from 'src/app/shared/dto/tanda/EditTandaRequest';
import { EditTandaResponse } from 'src/app/shared/dto/tanda/EditTandaResponse';
import { GetClientByIdTandaRequest } from 'src/app/shared/dto/client/GetClientByIdTandaRequest';
import { ClientService } from 'src/app/shared/services/client.service';
import { GetClientResponse } from 'src/app/shared/dto/client/GetClientResponse';
import { Client } from 'src/app/shared/models/Client';

@Component({
  selector: 'app-tanda',
  templateUrl: './tanda.component.html',
  styleUrls: ['./tanda.component.css']
})
export class TandaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'description', 'hourStart', 'hourEnd', 'deliveryDriver', 'actions'];
  actionForm: string;
  listDeliveryDriver: DeliveryDriver[];
  viewAssign: boolean;
  viewRemove: boolean;
  viewList: boolean;
  viewInfo: boolean;
  listTanda: Tanda[];
  listIdTanda: number[];
  listClient: Client[];
  tandaSelected: Tanda;
  dataSource: any;
  viewUnassignableAddresses: boolean;


  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }


  constructor(
    private tandaService: TandaService,
    public dialog: MatDialog,
    private deliveryDriverService: DeliveryDriverService,
    private dialogService: DialogService,
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.getTanda();
    this.getDeliveryDriver();
    this.viewList = true;
    this.listIdTanda = [];
  }

  async getTanda() {
    await this.tandaService.getTanda().subscribe((res: GetTandaResponse) => {
      this.dataSource = new MatTableDataSource(res.tanda);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.listTanda = res.tanda;
    })
  }

  async getDeliveryDriver() {
    await this.deliveryDriverService.getDeliveryDriver().subscribe((res: GetDeliveryDriverResponse) => {
      this.listDeliveryDriver = res.deliveryDriver;
    })
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClickAdd() {
    this.actionForm = 'Add';
    const dataForm: DataFormTanda = {
      actionForm: "Add",
      tanda: new Tanda(null),
      listDeliveryDriver: this.listDeliveryDriver
    };
    this.gestionateForm(dataForm);
  }

  onClickEdit(tanda: any) {
    this.actionForm = 'Edit';
    const dataForm: DataFormTanda = {
      actionForm: "Edit",
      tanda: tanda,
      listDeliveryDriver: this.listDeliveryDriver

    };
    this.gestionateForm(dataForm);
  }

  async onClickDelete(tanda: any) {
    if (await this.generateConfirm("Está a punto de eliminar un registro. ¿Está seguro de realizar esta operación?") === true) {
      await this.deleteTanda(tanda);
    }
  }

  async deleteTanda(tanda: Tanda) {
    const request: DeleteTandaRequest = {
      idTanda: tanda.id
    }
    await this.tandaService.deleteTanda(request).subscribe(() => {
      this.getTanda();
    });
  }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  async gestionateForm(dataForm: DataFormTanda) {
    const dialogConfig = Utils.matDialogConfigDefault();
    dialogConfig.data = dataForm;
    const dialogRef = this.dialog.open(TandaFormComponent, dialogConfig);
    const componentInstance = dialogRef.componentInstance;

    componentInstance.onSubmit.subscribe(async (data) => {
      if (!data) {
        dialogRef.close();
        return false;
      }

      var result: any = await this.onSubmit(data);
      if (result) {
        return false;
      }
      else {
        dialogRef.close();
        await this.getTanda();
        return true;
      }
    })
  }

  async onSubmit(tanda: Tanda) {
    const resultOperation = this.actionForm == "Add" ? await this.addTanda(tanda) : await this.editTanda(tanda);

    return resultOperation;
  }

  async addTanda(tanda: Tanda) {
    const addTandaRequest: AddTandaRequest = {
      tanda: tanda,
      idDeliveryDriver: tanda.deliveryDriver.id
    }
    addTandaRequest.tanda.deliveryDriver = new DeliveryDriver(null);

    await this.tandaService.addTanda(addTandaRequest).subscribe((res: AddTandaResponse) => {
      this.getTanda()
      return res;
    }
    );
  }

  async editTanda(tanda: Tanda) {
    const editTandaRequest: EditTandaRequest = {
      tanda: tanda,
      idDeliveryDriver: tanda.deliveryDriver.id
    }
    editTandaRequest.tanda.deliveryDriver = new DeliveryDriver(null);
    await this.tandaService.editTanda(editTandaRequest).subscribe((res: EditTandaResponse) => {
      this.getTanda()
      return res;
    })
  }

  onClickList() {
    this.viewAssign = false;
    this.viewRemove = false;
    this.viewInfo = false;
    this.viewList = true;
    this.viewUnassignableAddresses = false;

  }

  onClickViewInfo(tanda: Tanda) {
    this.showInfoTanda(tanda.id);
    this.viewInfo = true;
    this.viewAssign = false;
    this.viewRemove = false;
    this.viewList = false;
    this.tandaSelected = tanda;
    this.viewUnassignableAddresses = false;
  }

  showInfoTanda(idTanda: number) {
    this.listIdTanda.push(idTanda)
    const request: GetClientByIdTandaRequest = {
      idTanda: this.listIdTanda
    }
    this.clientService.getClientByIdTanda(request).subscribe((res: GetClientResponse) => {
      this.listIdTanda = [];
      this.listClient = res.client;
    })

  }

  onClickviewUnassignableAddresses(){
    this.viewList = false;
    this.viewInfo = false;
    this.tandaSelected = new Tanda(null);
    this.viewUnassignableAddresses = true;

  }

  getAddresses(){
    const request: GetClientByIdTandaRequest = {
      idTanda: []
    }
    this.clientService.getClientByIdTanda(request).subscribe((res: GetClientResponse) => {
      this.listClient = res.client;
      this.onClickviewUnassignableAddresses();
    })
  }

}
