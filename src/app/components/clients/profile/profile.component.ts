import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { DataFormClient } from 'src/app/shared/dto/client/DataFormRegisterClient';
import { GetClientByIdUserResponse } from 'src/app/shared/dto/client/GetClientByIdUserResponse';
import { UpdateClientRequest } from 'src/app/shared/dto/client/UpdateClientRequest';
import { Client } from 'src/app/shared/models/Client';
import { ClientService } from 'src/app/shared/services/client.service';
import { Utils } from 'src/app/utils';
import { ClientFormComponent } from '../client-form/client-form.component';
import { UrlService } from 'src/app/shared/services/url.service';
import { BaseResponse } from 'src/app/shared/dto/BaseResponse';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile: KeycloakProfile | null = null;
  userRoles: string[] = [];
  client: Client;
  actionFormAddress: string;


  constructor(private readonly keycloak: KeycloakService,
    private clientService: ClientService,
    public dialog: MatDialog,
    private urlService: UrlService
  ) { }


  async ngOnInit() {
    this.userProfile = await this.keycloak.loadUserProfile();
    this.userRoles = this.keycloak.getUserRoles()
    this.evaluateUser();
  }


  evaluateUser() {
    if (this.userRoles.indexOf('admin') != -1) {
      if (this.clientService.getClientPersonified()) {
        this.client = new Client(this.clientService.getClientPersonified())
      }
      else
        this.urlService.goToAdminPanel();
    }
    else
      this.getClientByIdUser()
  }

  async getClientByIdUser() {
    await this.clientService.getClientByIdUser(this.userProfile?.id!).subscribe((res: GetClientByIdUserResponse) => {
      this.client = res.client
    });
  }

  onClickUpdate() {
    const dataForm: DataFormClient = {
      actionForm: "Edit",
      client: this.client,
      userProfile: this.userProfile!,
      isAdmin: this.userRoles.indexOf('admin') != -1 ? true : false
    };
    this.gestionateForm(dataForm);
  }

  async gestionateForm(dataForm: DataFormClient) {
    const dialogConfig = Utils.matDialogConfigDefault();
    dialogConfig.data = dataForm;
    dialogConfig.maxWidth = '95%';
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
    await this.clientService.updateClient(updateClientRequest).subscribe((res: BaseResponse) => {
      if (this.userRoles.indexOf('admin') != -1) {
        this.urlService.goToAdminPanel();
      }
      else
        this.getClientByIdUser()
      return res;
    })
  }


}


