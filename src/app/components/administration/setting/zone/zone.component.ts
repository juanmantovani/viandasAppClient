import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddZoneRequest } from 'src/app/shared/dto/setting/AddZoneRequest';
import { AddZoneResponse } from 'src/app/shared/dto/setting/AddZoneResponse';
import { DataFormZone } from 'src/app/shared/dto/setting/DataFormZone';
import { DeleteZoneRequest } from 'src/app/shared/dto/setting/DeleteZoneRequest';
import { EditZoneRequest } from 'src/app/shared/dto/setting/EditZoneRequest';
import { EditZoneResponse } from 'src/app/shared/dto/setting/EditZoneResponse';
import { GetZoneResponse } from 'src/app/shared/dto/setting/GetZoneResponse';
import { UpdateZoneAddressResponse } from 'src/app/shared/dto/address/UpdateZoneAddressResponse';
import { Zone } from 'src/app/shared/models/Zone';
import { AddressService } from 'src/app/shared/services/address.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SettingService } from 'src/app/shared/services/setting.service';
import { Utils } from 'src/app/utils';
import { ZoneFormComponent } from '../zone-form/zone-form.component';


@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {

  actionFormZone: string;
  dataSource: any;
  displayedColumns: string[] = ['description', 'price', 'actions'];

  constructor(
    public dialog: MatDialog,
    private settingService: SettingService,
    private dialogService: DialogService,
    private addressService: AddressService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getZone();
  }

  async getZone() {
    await this.settingService.getZone().subscribe((res: GetZoneResponse) => {
      this.dataSource = new MatTableDataSource(res.zones);
    })

  }

  //Primero se consulta sin aplicar (dryRun) para mostrar cuántas direcciones cambian
  onClickUpdateZoneAddress() {
    this.addressService.updateZoneAddress(true).subscribe(async (res: UpdateZoneAddressResponse) => {
      if (res.changed.length == 0) {
        this.notificationService.show('Todas las direcciones ya tienen la zona correcta.', { classname: 'bg-success text-light', delay: 4000 });
        return;
      }
      const changesByZone = new Map<string, number>();
      res.changed.forEach(c => {
        const key = `zona ${c.oldIdZone} → ${c.newIdZone}`;
        changesByZone.set(key, (changesByZone.get(key) || 0) + 1);
      });
      const detail = Array.from(changesByZone, ([key, cant]) => `${key}: ${cant}`).join(', ');
      var msg = `Se va a actualizar la zona de ${res.changed.length} de ${res.total} direcciones (${detail}).`;
      if (res.withoutZone.length > 0)
        msg += ` ${res.withoutZone.length} sin coordenadas o fuera de las zonas quedan como están.`;
      if (await this.generateConfirm(msg + " ¿Desea continuar?") === true) {
        this.addressService.updateZoneAddress(false).subscribe();
      }
    });
  }

  onClickZone(zone?: Zone){
    var dataForm = new DataFormZone();
    if (zone == null) {
      this.actionFormZone = "Add"
      dataForm = {
        actionForm: "Add",
        zone: new Zone(null),
      };
    } else {
      this.actionFormZone = "Edit"
      dataForm = {
        actionForm: "Edit",
        zone: zone,
      };
    }
    this.gestionateForm(dataForm);
  }

  async onClickDelete(zone: Zone) {
    if (await this.generateConfirm("Está a punto de eliminar un registro. ¿Está seguro de realizar esta operación?") === true) {
      await this.deleteZone(zone);
    }
  }

  async deleteZone(zone: Zone) {
    const request: DeleteZoneRequest = {
      idZone: zone.id
    }
    await this.settingService.deleteZone(request).subscribe(() => {
      this.getZone();
    });
  }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  async gestionateForm(dataForm: DataFormZone) {
    const dialogConfig = Utils.matDialogConfigDefault();
    dialogConfig.data = dataForm;
    const dialogRef = this.dialog.open(ZoneFormComponent, dialogConfig);
    const componentInstance = dialogRef.componentInstance;

    componentInstance.onSubmit.subscribe(async (data) => {
      if (!data) {
        dialogRef.close();
        return false;
      }

      var result: any = await this.onSubmitZone(data);
      if (result) {
        return false;
      }
      else {
        dialogRef.close();
        return true;
      }
    })
  }

  async onSubmitZone(zone: Zone) {
    const resultOperation = this.actionFormZone == "Add" ? await this.addZone(zone) : await this.editZone(zone);

    return resultOperation;
  }

  async addZone(zone: Zone) {
    const addZoneRequest: AddZoneRequest = {
      zone: zone,
    }

    await this.settingService.addZone(addZoneRequest).subscribe((res: AddZoneResponse) => {
      this.getZone()
      return res;
    }
    );
  }

  async editZone(zone: Zone) {
    const editZoneRequest: EditZoneRequest = {
      zone: zone
    }
    await this.settingService.editZone(editZoneRequest).subscribe((res: EditZoneResponse) => {
      this.getZone()
      return res;
    })
  }

}
