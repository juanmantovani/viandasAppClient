import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataFormZone } from 'src/app/shared/dto/setting/DataFormZone';
import { Discount } from 'src/app/shared/models/Discount';
import { Utils } from 'src/app/utils';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { DiscountFormComponent } from '../discount-form/discount-form.component';
import { SettingService } from 'src/app/shared/services/setting.service';
import { DataFormDiscount } from 'src/app/shared/dto/setting/DataFormDiscount';
import { AddDiscountRequest } from 'src/app/shared/dto/setting/AddDiscountRequest';
import { AddDiscountResponse } from 'src/app/shared/dto/setting/AddDiscountResponse';
import { EditDiscountRequest } from 'src/app/shared/dto/setting/EditDiscountRequest';
import { EditDiscountResponse } from 'src/app/shared/dto/setting/EditDiscountResponse';
import { GetDiscountResponse } from 'src/app/shared/dto/setting/GetDiscountResponse';
import { DeleteDiscountRequest } from 'src/app/shared/dto/setting/DeleteDiscountRequest';


@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {

  actionFormDiscount: string;
  dataSource: any;
  displayedColumns: string[] = ['description', 'cant', 'percentage', 'actions'];

  constructor(
    public dialog: MatDialog,
    private settingService: SettingService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getDiscount();
  }

  async getDiscount() {
    await this.settingService.getDiscount().subscribe((res: GetDiscountResponse) => {
      this.dataSource = new MatTableDataSource(res.discounts);
    })

  }

  onClickDesc(discount?: Discount){
    var dataForm = new DataFormDiscount();
    if (discount == null) {
      this.actionFormDiscount = "Add"
      dataForm = {
        actionForm: "Add",
        discount: new Discount(null),
      };
    } else {
      this.actionFormDiscount = "Edit"
      dataForm = {
        actionForm: "Edit",
        discount: discount,
      };
    }
    this.gestionateForm(dataForm);
  }

  async onClickDelete(discount: Discount) {
    if (await this.generateConfirm("Está a punto de eliminar un registro. ¿Está seguro de realizar esta operación?") === true) {
      await this.deleteDiscount(discount);
    }
  }

  async deleteDiscount(discount: Discount) {
    const request: DeleteDiscountRequest = {
      idDiscount: discount.id
    }
    await this.settingService.deleteDiscount(request).subscribe(() => {
      this.getDiscount();
    });
  }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  async gestionateForm(dataForm: DataFormDiscount) {
    const dialogConfig = Utils.matDialogConfigDefault();
    dialogConfig.data = dataForm;
    const dialogRef = this.dialog.open(DiscountFormComponent, dialogConfig);
    const componentInstance = dialogRef.componentInstance;

    componentInstance.onSubmit.subscribe(async (data) => {
      if (!data) {
        dialogRef.close();
        return false;
      }

      var result: any = await this.onSubmitDiscount(data);
      if (result) {
        return false;
      }
      else {
        dialogRef.close();
        return true;
      }
    })
  }

  async onSubmitDiscount(discount: Discount) {
    const resultOperation = this.actionFormDiscount == "Add" ? await this.addDiscount(discount) : await this.editDiscount(discount);
    return resultOperation;
  }

  async addDiscount(discount: Discount) {
    const addDiscountRequest: AddDiscountRequest = {
      discount: discount,
    }

    await this.settingService.addDiscount(addDiscountRequest).subscribe((res: AddDiscountResponse) => {
      this.getDiscount()
      return res;
    }
    );
  }

  async editDiscount(discount: Discount) {
    const editDiscountRequest: EditDiscountRequest = {
      discount: discount
    }
    await this.settingService.editDiscount(editDiscountRequest).subscribe((res: EditDiscountResponse) => {
      this.getDiscount()
      return res;
    })
  }

}
