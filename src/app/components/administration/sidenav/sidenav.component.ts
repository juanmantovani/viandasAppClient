import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { GetClientByIdTandaRequest } from 'src/app/shared/dto/client/GetClientByIdTandaRequest';
import { GetClientResponse } from 'src/app/shared/dto/client/GetClientResponse';
import { ClientService } from 'src/app/shared/services/client.service';
import * as ROUTES from '../../../shared/routes/index.routes'


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css', '../../../app.component.css']
})
export class SidenavComponent implements OnInit {

  addressesUnassignabled: number;

  opened = true;
  CARROUSEL = ROUTES.INTERNAL_ROUTES.CARROUSEL;
  FOOD = ROUTES.INTERNAL_ROUTES.FOOD;
  CATEGORY = ROUTES.INTERNAL_ROUTES.CATEGORY;
  MENU = ROUTES.INTERNAL_ROUTES.MENU;
  PATHOLOGY = ROUTES.INTERNAL_ROUTES.PATHOLOGY;
  DELIVERYDRIVER = ROUTES.INTERNAL_ROUTES.DELIVERYDRIVER;
  TANDA = ROUTES.INTERNAL_ROUTES.TANDA;
  CLIENT = ROUTES.INTERNAL_ROUTES.CLIENT;
  ORDER = ROUTES.INTERNAL_ROUTES.ORDER;
  SETTING = ROUTES.INTERNAL_ROUTES.SETTING;
  INICIO = ROUTES.INTERNAL_ROUTES.INICIO;

  status: string;

  public userProfile: KeycloakProfile | null = null;
  public isLoggedIn = false;
  public userRoles: string[] = [];

  constructor(private readonly keycloak: KeycloakService, private router: Router, private clientService: ClientService) { }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.userRoles = this.keycloak.getUserRoles()
      this.getAddressesUnassignabled();
    } else this.logout();

    if (this.userRoles.indexOf('admin') == -1) {
      this.router.navigate(['/inicio'])

    }
  }

  public logout() {
    this.keycloak.logout(location.origin + '/' + this.INICIO);
  }

  async getAddressesUnassignabled() {
    const request: GetClientByIdTandaRequest = {
      idTanda: []
    }
    await this.clientService.getClientByIdTanda(request).subscribe((res: GetClientResponse) => {
      if (res.client) {
        this.addressesUnassignabled = 0;
        res.client.forEach(client => {
          this.addressesUnassignabled = this.addressesUnassignabled + client.addresses?.length;
        })
      }
    })
  }

}