import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAddressRequest } from 'src/app/shared/dto/address/AddAddressRequest';
import { AddAddressResponse } from 'src/app/shared/dto/address/AddAddressResponse';
import { DataFormAddress } from 'src/app/shared/dto/address/DataFormAddress';
import { DeleteAddressRequest } from 'src/app/shared/dto/address/DeleteAddressRequest';
import { EditAddressRequest } from 'src/app/shared/dto/address/EditAddressRequest';
import { EditAddressResponse } from 'src/app/shared/dto/address/EditAddressResponse';
import { SetFavouriteAddressRequest } from 'src/app/shared/dto/address/SetFavouriteAddressRequest';
import { Address } from 'src/app/shared/models/Address';
import { Client } from 'src/app/shared/models/Client';
import { AddressService } from 'src/app/shared/services/address.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Utils } from 'src/app/utils';
import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  @Input() client: Client;
  @Input() selectionableAddress: boolean;
  @Input() selectedAddress: Address;
  @Output() getClient: EventEmitter<any> = new EventEmitter();
  @Output() selectedAddressEmit: EventEmitter<Address> = new EventEmitter();


  actionFormAddress: string;

  constructor(private clientService: ClientService,
    public dialog: MatDialog,
    private addressService: AddressService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
  }


  onClickEditAddress(address: Address) {
    this.actionFormAddress = "Edit"
    const dataForm: DataFormAddress = {
      actionForm: "Edit",
      address: address,
      client: this.client
    };
    this.gestionateFormAddress(dataForm);
  }

  onClickAddAddress() {
    this.actionFormAddress = "Add"
    const dataForm: DataFormAddress = {
      actionForm: "Add",
      address: new Address(null),
      client: this.client
    };
    this.gestionateFormAddress(dataForm);
  }

  async gestionateFormAddress(dataForm: DataFormAddress) {
    const dialogConfig = Utils.matDialogConfigDefault();
    dialogConfig.data = dataForm;
    const dialogRef = this.dialog.open(AddressFormComponent, dialogConfig);
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
        return true;
      }
    })
  }

  async onSubmit(address: Address) {
    const resultOperation = this.actionFormAddress == "Add" ? await this.addAddress(address) : await this.updateAddress(address);
    return resultOperation;
  }

  async addAddress(address: Address) {

    const addAddressRequest: AddAddressRequest = {
      address: address,
      idCLient: this.client.id
    }

    await this.addressService.addAddress(addAddressRequest).subscribe((res: AddAddressResponse) => {
      this.getClient.emit()
      return res;
    })
  }

  async updateAddress(address: Address) {
    const updateAddressRequest: EditAddressRequest = {
      address: address
    }
    await this.addressService.editAddress(updateAddressRequest).subscribe((res: EditAddressResponse) => {
      this.getClient.emit()
      return res;
    })
  }

  async onClickDeleteAddress(address: Address) {
    if (await this.generateConfirm("Está a punto de eliminar un registro. ¿Está seguro de realizar esta operación?") === true) {
      await this.deleteAddress(address);
    }
  }

  async deleteAddress(address: Address) {
    const request: DeleteAddressRequest = {
      idAddress: address.id
    }
    await this.addressService.deleteAddress(request).subscribe(() => {
      this.getClient.emit()
    });
  }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  async onClickSetAsFavourite(address: Address) {
    if (await this.generateConfirm("¿Está seguro asignar esta dirección como favorita?") === true) {
      await this.setFavouriteAddress(address);
    }
  }

  async setFavouriteAddress(address: Address) {

    const request: SetFavouriteAddressRequest = {
      idNewFavouriteAddress: address.id,
      idClient: this.client.id,
      idOldFavouriteAddress: this.findFavouriteAddres(this.client.addresses)
    }
    await this.addressService.setFavouriteAddress(request).subscribe(() => {
      this.getClient.emit()
    });
  }

  private findFavouriteAddres(addresses: Address[]) {
    var address = addresses.find(a => a.favourite == true)

    return address?.id!
  }

  onSelectAddress(address: Address){
    if (this.selectionableAddress){
      this.selectedAddress = address;
      this.selectedAddressEmit.emit(address);
    }
  }

}
