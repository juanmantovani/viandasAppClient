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
import { Zone } from 'src/app/shared/models/Zone';
import { DialogService } from 'src/app/shared/services/dialog.service';
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
    private settingSerive: SettingService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getZone();
  }

  async getZone() {
    await this.settingSerive.getZone().subscribe((res: GetZoneResponse) => {
      this.dataSource = new MatTableDataSource(res.zones);
    })

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
    await this.settingSerive.deleteZone(request).subscribe(() => {
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
        await this.getZone();
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

    await this.settingSerive.addZone(addZoneRequest).subscribe((res: AddZoneResponse) => {
      this.getZone()
      return res;
    }
    );
  }

  async editZone(zone: Zone) {
    const editZoneRequest: EditZoneRequest = {
      zone: zone
    }
    await this.settingSerive.editZone(editZoneRequest).subscribe((res: EditZoneResponse) => {
      this.getZone()
      return res;
    })
  }

}
