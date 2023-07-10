import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { DataFormClient } from 'src/app/shared/dto/client/DataFormRegisterClient';
import { GetClientByIdUserResponse } from 'src/app/shared/dto/client/GetClientByIdUserResponse';
import { RegisterClientRequest } from 'src/app/shared/dto/client/RegisterClientRequest';
import { Client } from 'src/app/shared/models/Client';
import { ClientService } from 'src/app/shared/services/client.service';
import { Utils } from 'src/app/utils';
import { ClientFormComponent } from '../client-form/client-form.component';
import * as ROUTES from '../../../shared/routes/index.routes'
import { UrlService } from 'src/app/shared/services/url.service';
import { BaseResponse } from 'src/app/shared/dto/BaseResponse';


@Component({
  selector: 'app-inicio-client',
  templateUrl: './inicio-client.component.html',
  styleUrls: ['./inicio-client.component.css']
})
export class InicioClientComponent implements OnInit {
  userProfile: KeycloakProfile | null = null;
  userRoles: string[] = [];
  WELCOME: string = ROUTES.INTERNAL_ROUTES.CLIENT + '/' + ROUTES.INTERNAL_ROUTES.WELCOME;

  constructor(
    public dialog: MatDialog,
    private readonly keycloak: KeycloakService,
    private clientService: ClientService,
    private router: Router,
    private urlService: UrlService
  ) {

  }

  async ngOnInit() {
    this.userProfile = await this.keycloak.loadUserProfile();
    this.userRoles = this.keycloak.getUserRoles()
    this.evaluateUser();
  }

  evaluateUser() {
    if (this.userRoles.indexOf('admin') != -1) {
      if (!this.clientService.getClientPersonified())
        this.urlService.goToAdminPanel();
    }
    else
      this.getClientByIdUser()
  }

  async getClientByIdUser() {
    await this.clientService.getClientByIdUser(this.userProfile?.id!).subscribe((res: GetClientByIdUserResponse) => {
      if (res.client == undefined) {
        //if (true) {
        const dataForm: DataFormClient = {
          actionForm: "Register",
          client: new Client(null),
          userProfile: this.userProfile!,
          isAdmin: false
        };
        this.gestionateForm(dataForm);
        //}
      }
    })
  }

  async gestionateForm(dataForm: DataFormClient) {
    const dialogConfig = Utils.matDialogConfigDefault();
    dialogConfig.data = dataForm;
    dialogConfig.maxWidth = '95%';
    dialogConfig.maxHeight = '95%';
    dialogConfig.disableClose = true;
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

    await this.clientService.registerClient(registerClientRequest).subscribe((res: BaseResponse) => {
      if (res) {
        this.router.navigateByUrl(this.WELCOME);
      };
    }
    );
  }

}
