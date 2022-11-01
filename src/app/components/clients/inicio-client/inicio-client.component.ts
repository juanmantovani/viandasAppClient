import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataFormRegisterClient } from 'src/app/shared/dto/clients/DataFormRegisterClient';
import { RegisterClientRequest } from 'src/app/shared/dto/clients/RegisterClientRequest';
import { RegisterClientResponse } from 'src/app/shared/dto/clients/RegisterClientResponse';
import { UpdateClientRequest } from 'src/app/shared/dto/clients/UpdateClientRequest';
import { UpdateClientResponse } from 'src/app/shared/dto/clients/UpdateClientResponse';
import { Client } from 'src/app/shared/models/Clients';
import { ClientService } from 'src/app/shared/services/client.service';
import { Utils } from 'src/app/utils';
import { RegisterClientComponent } from '../register-client/register-client.component';

@Component({
  selector: 'app-inicio-client',
  templateUrl: './inicio-client.component.html',
  styleUrls: ['./inicio-client.component.css']
})
export class InicioClientComponent implements OnInit {
  actionForm: string;

  constructor(public dialog: MatDialog, private clientService : ClientService) { }

  ngOnInit(): void {
    if(1 == 1){
      this.actionForm = 'Alta';
      const dataForm: DataFormRegisterClient = {
      actionForm: "Alta",
      client: new Client(null),
    };
    this.gestionateForm(dataForm);
    }
  }

  async gestionateForm(dataForm: DataFormRegisterClient) {
    const dialogConfig = Utils.matDialogConfigDefault();
    dialogConfig.data = dataForm;
    const dialogRef = this.dialog.open(RegisterClientComponent, dialogConfig);
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
