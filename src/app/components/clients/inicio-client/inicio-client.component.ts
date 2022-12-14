import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { DataFormClient } from 'src/app/shared/dto/client/DataFormRegisterClient';
import { GetClientByIdUserResponse } from 'src/app/shared/dto/client/GetClientByIdUserResponse';
import { RegisterClientRequest } from 'src/app/shared/dto/client/RegisterClientRequest';
import { RegisterClientResponse } from 'src/app/shared/dto/client/RegisterClientResponse';
import { UpdateClientRequest } from 'src/app/shared/dto/client/UpdateClientRequest';
import { UpdateClientResponse } from 'src/app/shared/dto/client/UpdateClientResponse';
import { Client } from 'src/app/shared/models/Client';
import { ClientService } from 'src/app/shared/services/client.service';
import { Utils } from 'src/app/utils';
import { ClientFormComponent } from '../client-form/client-form.component';
import  * as ROUTES  from '../../../shared/routes/index.routes'


@Component({
  selector: 'app-inicio-client',
  templateUrl: './inicio-client.component.html',
  styleUrls: ['./inicio-client.component.css']
})
export class InicioClientComponent implements OnInit {
  userProfile: KeycloakProfile | null = null;
  PROFILE: string = ROUTES.INTERNAL_ROUTES.CLIENT +'/'+ ROUTES.INTERNAL_ROUTES.PROFILE;


  constructor(public dialog: MatDialog, private readonly keycloak: KeycloakService, private clientService: ClientService, private router: Router) { }

  async ngOnInit() {
    this.userProfile = await this.keycloak.loadUserProfile();
    this.getClientByIdUser();
  }

  async getClientByIdUser() {
    await this.clientService.getClientByIdUser(this.userProfile?.id!).subscribe((res: GetClientByIdUserResponse) => {
      if (res.client == undefined) {
        const dataForm: DataFormClient = {
          actionForm: "Alta",
          client: new Client(null),
          userProfile: this.userProfile!
        };
        this.gestionateForm(dataForm);
      }
    })
  }

  async gestionateForm(dataForm: DataFormClient) {
    const dialogConfig = Utils.matDialogConfigDefault();
    dialogConfig.data = dataForm;
    const dialogRef = this.dialog.open(ClientFormComponent, dialogConfig);
    const componentInstance = dialogRef.componentInstance;

    componentInstance.onSubmit.subscribe(async (data) => {
      if (!data) {
        dialogRef.close();
        return false;
      }

      var result: any = await this.registerClient(data);
      if (result) {
        return false;
      }
      else {
        dialogRef.close();
        return true;
      }
    })
  }

  async registerClient(client: Client) {
    const registerClientRequest: RegisterClientRequest = {
      client: client
    }

    await this.clientService.registerClient(registerClientRequest).subscribe((res: RegisterClientResponse) => {
      if (res){
        this.router.navigateByUrl(this.PROFILE);

      };
    }
    );
  }

}
