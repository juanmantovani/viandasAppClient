import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { GetClientByIdUserResponse } from 'src/app/shared/dto/client/GetClientByIdUserResponse';
import { Client } from 'src/app/shared/models/Client';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  userProfile: KeycloakProfile | null = null;
  client: Client;

  constructor(
    private readonly keycloak: KeycloakService,
    private clientService: ClientService
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
}
