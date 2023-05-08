import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataFormAddress } from 'src/app/shared/dto/address/DataFormAddress';
import { DataFormTakeAwayAddress } from 'src/app/shared/dto/setting/DataFormTakeAwayAddress';
import { getAddressTakeAwayResponse } from 'src/app/shared/dto/setting/getAddressTakeAwayResponse';
import { Address } from 'src/app/shared/models/Address';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SettingService } from 'src/app/shared/services/setting.service';
import { Utils } from 'src/app/utils';
import { EditAddressTakeAwayRequest } from 'src/app/shared/dto/setting/editAddressTakeAwayRequest';
import { EditAddressTakeAwayResponse } from 'src/app/shared/dto/setting/editAddressTakeAwayResponse';
import { AddressFormComponent } from 'src/app/components/clients/address-form/address-form.component';

@Component({
  selector: 'app-take-away-address',
  templateUrl: './take-away-address.component.html',
  styleUrls: ['./take-away-address.component.css']
})
export class TakeAwayAddressComponent implements OnInit {

  address: Address = new Address(null);
  actionFormTakeAwayAddress: string;

  constructor(
    public dialog: MatDialog,
    private settingService: SettingService,
    private dialogService: DialogService,
  ) {
   }

  async ngOnInit() {
    await this.getAddressTakeAway()

  }

  async getAddressTakeAway(){
    await this.settingService.getAddressTakeAway().subscribe((res: getAddressTakeAwayResponse)=> {
      this.address = res.address

    })
  }

  onClickEditAddress(){
    var dataForm = new DataFormTakeAwayAddress();
    this.actionFormTakeAwayAddress = "Edit"
    dataForm = {
      actionForm: "Edit",
      address: new Address(this.address),
    };

    this.gestionateForm(dataForm);
  }

  onClickAddAddress(){
    var dataForm = new DataFormTakeAwayAddress();
    this.actionFormTakeAwayAddress = "Add"
    dataForm = {
      actionForm: "Add",
      address: new Address(this.address),
    };

    this.gestionateForm(dataForm);
  }


  async onSubmitTakeAwayAddress(address: Address) {
    const resultOperation = await this.editTakeAwayAddress(address);
    return resultOperation;
  }

  async gestionateForm(dataForm: DataFormTakeAwayAddress) {
    const dialogConfig = Utils.matDialogConfigDefault();
    dialogConfig.data = dataForm;
    const dialogRef = this.dialog.open(AddressFormComponent, dialogConfig);
    const componentInstance = dialogRef.componentInstance;

    componentInstance.onSubmit.subscribe(async (data) => {
      if (!data) {
        dialogRef.close();
        return false;
      }

      var result: any = await this.onSubmitTakeAwayAddress(data);
      if (result) {
        return false;
      }
      else {
        dialogRef.close();
        return true;
      }
    })
  }

  async editTakeAwayAddress(address: Address) {
    const editAddressTakeAwayRequest: EditAddressTakeAwayRequest = {
      address: address
    }
    await this.settingService.editAddressTakeAway(editAddressTakeAwayRequest).subscribe((res: EditAddressTakeAwayResponse) => {
      this.getAddressTakeAway();
      return res;
    })
  }



  

}
