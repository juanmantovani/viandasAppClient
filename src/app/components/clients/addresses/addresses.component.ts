import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { GetClientByIdUserResponse } from 'src/app/shared/dto/client/GetClientByIdUserResponse';
import { Client } from 'src/app/shared/models/Client';
import { ClientService } from 'src/app/shared/services/client.service';
import { UrlService } from 'src/app/shared/services/url.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  userProfile: KeycloakProfile | null = null;
  userRoles: string[] = [];
  existAddresses: boolean;

  client: Client;

  constructor(
    private readonly keycloak: KeycloakService,
    private clientService: ClientService,
    private urlService : UrlService
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
      else{
      this.urlService.goToAdminPanel();
    }
    }
    else
      this.getClientByIdUser()
  }

  async getClientByIdUser() {
    await this.clientService.getClientByIdUser(this.userProfile?.id!).subscribe((res: GetClientByIdUserResponse) => {
      this.client = res.client
      if (this.client.addresses.length > 0){ 
        this.existAddresses = true;
      } else {
        this.existAddresses = false;
      }
    });
  }
}
