import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { DataFormAddress } from 'src/app/shared/dto/address/DataFormAddress';
import { EditAddressRequest } from 'src/app/shared/dto/address/EditAddressRequest';
import { EditAddressResponse } from 'src/app/shared/dto/address/EditAddressResponse';
import { DataFormRegisterClient } from 'src/app/shared/dto/client/DataFormRegisterClient';
import { GetClientByIdUserResponse } from 'src/app/shared/dto/client/GetClientByIdUserResponse';
import { UpdateClientRequest } from 'src/app/shared/dto/client/UpdateClientRequest';
import { UpdateClientResponse } from 'src/app/shared/dto/client/UpdateClientResponse';
import { Address } from 'src/app/shared/models/Address';
import { Client } from 'src/app/shared/models/Client';
import { AddressService } from 'src/app/shared/services/address.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { Utils } from 'src/app/utils';
import { AddressFormComponent } from '../address-form/address-form.component';
import { ClientFormComponent } from '../client-form/client-form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile: KeycloakProfile | null = null;
  client: Client;

  constructor(private readonly keycloak: KeycloakService, 
    private clientService: ClientService, 
    public dialog: MatDialog,
    private addressService : AddressService
    ) { }


  async ngOnInit() {
    this.userProfile = await this.keycloak.loadUserProfile();
    this.getClientByIdUser();
  }

  async getClientByIdUser() {
    await this.clientService.getClientByIdUser(this.userProfile?.id!).subscribe((res: GetClientByIdUserResponse) => {
      this.client = res.client
    });
  }

  onClickUpdate() {
    const dataForm: DataFormRegisterClient = {
      actionForm: "Edit",
      client: this.client,
      userProfile: this.userProfile!
    };
    this.gestionateForm(dataForm);
  }

  async gestionateForm(dataForm: DataFormRegisterClient) {
    const dialogConfig = Utils.matDialogConfigDefault();
    dialogConfig.data = dataForm;
    const dialogRef = this.dialog.open(ClientFormComponent, dialogConfig);
    const componentInstance = dialogRef.componentInstance;

    componentInstance.onSubmit.subscribe(async (data) => {
      if (!data) {
        dialogRef.close();
        return false;
      }

      var result: any = await this.updateClient(data);
      if (result) {
        return false;
      }
      else {
        dialogRef.close();
        return true;
      }
    })
  }

  async updateClient(client: Client) {
    const updateClientRequest: UpdateClientRequest = {
      client: client
    }
    await this.clientService.updateClient(updateClientRequest).subscribe((res: UpdateClientResponse) => {
      this.getClientByIdUser();
      return res;

    })
  }

  onClickEditAddress(address: Address) {
    const dataForm: DataFormAddress = {
      actionForm: "Edit",
      address: address,
      idClient : this.client.id
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

      var result: any = await this.updateAddress(data);
      if (result) {
        return false;
      }
      else {
        dialogRef.close();
        return true;
      }
    })
  }

  async updateAddress(address: Address) {
    const updateAddressRequest: EditAddressRequest = {
      address: address
    }
    await this.addressService.editAddress(updateAddressRequest).subscribe((res: EditAddressResponse) => {
      this.getClientByIdUser();
      return res;
    })
  }

  onClickAddAddress(){
    const dataForm: DataFormAddress = {
      actionForm: "Add",
      address: new Address(null),
      idClient : this.client.id
    };
    this.gestionateFormAddress(dataForm);

  }

}


