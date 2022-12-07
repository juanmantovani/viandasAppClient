import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SetFavouriteAddressRequest } from 'src/app/shared/dto/address/SetFavouriteAddressRequest';
import { Address } from 'src/app/shared/models/Address';
import { AddressService } from 'src/app/shared/services/address.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  result: Address;
  form: FormGroup;

  @Output() onSubmit: EventEmitter<Address | null>;

  constructor(
    private dialogService: DialogService,
    private addressService: AddressService,
    public dialogRef: MatDialogRef<AddressFormComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onSubmit = new EventEmitter<Address | null>();
    this.form = this.generateForm();
    this.result = new Address(null);
  }

  ngOnInit(): void {
  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.address?.id),
      street: new FormControl(this.data.address?.street, Validators.required),
      number: new FormControl(this.data.address?.number),
      floor: new FormControl(this.data.address?.floor),
      departament: new FormControl(this.data.address?.departament),
      observation: new FormControl(this.data.address?.observation)
    });
  }
  onClickCancel() {
    this.dialogRef.close();
  }

  onClickSave() {
    this.result = this.form.getRawValue()
    this.onSubmit.emit(this.result);
  }

  async onClickSetAsFavourite(data: any){
    if (await this.generateConfirm("¿Está seguro de realizar esta operación?") === true) {
      await this.setFavouriteAddress(data.address);
    }
  }

  async setFavouriteAddress(address: Address){
    const request: SetFavouriteAddressRequest = {
      idAddress: address.id,
      idClient: this.data.idClient
    }
    await this.addressService.setFavouriteAddress(request).subscribe(() => {
      this.onSubmit.emit()
    });
  }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }


}