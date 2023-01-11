import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeliveryDriver } from 'src/app/shared/models/DeliveryDriver';
import { DeliveryDriverService } from 'src/app/shared/services/delivery-driver.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { GetDeliveryDriverResponse } from 'src/app/shared/dto/deliveryDriver/GetDeliveryDriverResponse';
import { DataFormDeliveryDriver } from 'src/app/shared/dto/deliveryDriver/DataFormDeliveryDriver';
import { Utils } from 'src/app/utils';
import { DeliveryDriverFormComponent } from '../delivery-driver-form/delivery-driver-form.component';
import { AddDeliveryDriverRequest } from 'src/app/shared/dto/deliveryDriver/AddDeliveryDriverRequest';
import { AddDeliveryDriverResponse } from 'src/app/shared/dto/deliveryDriver/AddDeliveryDriverResponse';
import { EditDeliveryDriverRequest } from 'src/app/shared/dto/deliveryDriver/EditDeliveryDriverRequest';
import { EditDeliveryDriverResponse } from 'src/app/shared/dto/deliveryDriver/EditDeliveryDriverResponse';
import { DeleteDeliveryDriverRequest } from 'src/app/shared/dto/deliveryDriver/DeleteDeliveryDriverRequest';

@Component({
  selector: 'app-delivery-driver',
  templateUrl: './delivery-driver.component.html',
  styleUrls: ['./delivery-driver.component.css']
})
export class DeliveryDriverComponent implements OnInit {

  displayedColumns: string[] = ['dni', 'name', 'lastName', 'address', 'vehicle', 'actions'];
  actionForm: string;
  listDeliveryDriver: DeliveryDriver[];
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private deliveryDriverService: DeliveryDriverService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.getDeliveryDriver();
    this.paginator._intl.itemsPerPageLabel = 'Ítems por página';
  }

  async getDeliveryDriver() {
    await this.deliveryDriverService.getDeliveryDriver().subscribe((res: GetDeliveryDriverResponse) => {
      this.dataSource = new MatTableDataSource(res.deliveryDriver);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.listDeliveryDriver = res.deliveryDriver;
    })
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClickAdd() {
    this.actionForm = 'Add';
    const dataForm: DataFormDeliveryDriver = {
      actionForm: "Add",
      deliveryDriver: new DeliveryDriver(null),
      listDeliveryDriver: this.listDeliveryDriver
    };
    this.gestionateForm(dataForm);
  }

  onClickEdit(deliveryDriver: any) {
    this.actionForm = 'Edit';
    const dataForm: DataFormDeliveryDriver = {
      actionForm: "Edit",
      deliveryDriver: deliveryDriver,
      listDeliveryDriver: this.listDeliveryDriver
    };
    this.gestionateForm(dataForm);
  }

  async onClickDelete(deliveryDriver: any) {
    if (await this.generateConfirm("Está a punto de eliminar un registro. ¿Está seguro de realizar esta operación?") === true) {
      await this.deleteDeliveryDriver(deliveryDriver);
    }
  }

  async deleteDeliveryDriver(deliveryDriver: DeliveryDriver) {
    const request: DeleteDeliveryDriverRequest = {
      idDeliveryDriver: deliveryDriver.id
    }
    await this.deliveryDriverService.deleteDeliveryDriver(request).subscribe(() => {
      this.getDeliveryDriver();
    });
  }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  async gestionateForm(dataForm: DataFormDeliveryDriver) {
    const dialogConfig = Utils.matDialogConfigDefault();
    dialogConfig.data = dataForm;
    const dialogRef = this.dialog.open(DeliveryDriverFormComponent, dialogConfig);
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
        await this.getDeliveryDriver();
        return true;
      }
    })
  }

  async onSubmit(deliveryDriver: DeliveryDriver) {
    const resultOperation = this.actionForm == "Add" ? await this.addDeliveryDriver(deliveryDriver) : await this.editDeliveryDriver(deliveryDriver);

    return resultOperation;
  }

  async addDeliveryDriver(deliveryDriver: DeliveryDriver) {
    const addDeliveryDriverRequest: AddDeliveryDriverRequest = {
      deliveryDriver: deliveryDriver
    }
    await this.deliveryDriverService.addDeliveryDriver(addDeliveryDriverRequest).subscribe((res: AddDeliveryDriverResponse) => {
      this.getDeliveryDriver()
      return res;
    }
    );
  }

  async editDeliveryDriver(deliveryDriver: DeliveryDriver) {
    const editDeliveryDriverRequest: EditDeliveryDriverRequest = {
      deliveryDriver: deliveryDriver
    }
    await this.deliveryDriverService.editDeliveryDriver(editDeliveryDriverRequest).subscribe((res: EditDeliveryDriverResponse) => {
      this.getDeliveryDriver()
      return res;
    })
  }


}
