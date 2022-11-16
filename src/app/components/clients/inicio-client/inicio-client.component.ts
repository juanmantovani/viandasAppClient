import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { DataFormRegisterClient } from 'src/app/shared/dto/client/DataFormRegisterClient';
import { GetClientByIdUserResponse } from 'src/app/shared/dto/client/GetClientByIdUserResponse';
import { RegisterClientRequest } from 'src/app/shared/dto/client/RegisterClientRequest';
import { RegisterClientResponse } from 'src/app/shared/dto/client/RegisterClientResponse';
import { UpdateClientRequest } from 'src/app/shared/dto/client/UpdateClientRequest';
import { UpdateClientResponse } from 'src/app/shared/dto/client/UpdateClientResponse';
import { Client } from 'src/app/shared/models/Clients';
import { ClientService } from 'src/app/shared/services/client.service';
import { Utils } from 'src/app/utils';
import { ClientFormComponent } from '../client-form/client-form.component';

@Component({
  selector: 'app-inicio-client',
  templateUrl: './inicio-client.component.html',
  styleUrls: ['./inicio-client.component.css']
})
export class InicioClientComponent implements OnInit {
  actionForm: string;
  userProfile: KeycloakProfile | null = null;


  constructor(public dialog: MatDialog, private readonly keycloak: KeycloakService, private clientService : ClientService) { }

  async ngOnInit() {
    this.userProfile = await this.keycloak.loadUserProfile();
    this.getClientByIdUser(); 
  }
  async getClientByIdUser(){
    await this.clientService.getClientByIdUser(this.userProfile?.id!).subscribe((res : GetClientByIdUserResponse) => {
      if(res == null){
        this.actionForm = 'Alta';
        const dataForm: DataFormRegisterClient = {
        actionForm: "Alta",
        client: new Client(null),
        userProfile : this.userProfile!
      };
      this.gestionateForm(dataForm);
      }
    })
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

      var result : any  = await this.onSubmit(data);
      if (result) {
        return false;
      }
      else {
        dialogRef.close();
        return true;
      }
    })
  }

  async onSubmit(client: Client){ 
   
    const resultOperation = this.actionForm == "Alta" ? await this.registerClient(client) : await this.updateClient(client);
  
    return resultOperation;
  }

  async registerClient(client: Client) {
    const registerClientRequest: RegisterClientRequest = {
      client: client
    }

    await this.clientService.registerClient(registerClientRequest).subscribe((res: RegisterClientResponse) => {
      return res;
    }
    );
  }

  async updateClient(client: Client) {
    const updateClientRequest: UpdateClientRequest = {
      client: client
    }
    await this.clientService.updateClient(updateClientRequest).subscribe((res: UpdateClientResponse) => {
      return res;
    })
  }


}
