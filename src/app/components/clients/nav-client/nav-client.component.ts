import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import * as ROUTES from '../../../shared/routes/index.routes'
import { ClientService } from 'src/app/shared/services/client.service';


@Component({
  selector: 'app-nav-client',
  templateUrl: './nav-client.component.html',
  styleUrls: ['./nav-client.component.css']
})
export class NavCLientComponent implements OnInit {

  opened = false;
  PROFILE = ROUTES.INTERNAL_ROUTES.PROFILE;
  ORDER = ROUTES.INTERNAL_ROUTES.ORDER;
  ORDERS = ROUTES.INTERNAL_ROUTES.ORDERS;
  ADDRESSES = ROUTES.INTERNAL_ROUTES.ADDRESSES;
  INICIO = ROUTES.INTERNAL_ROUTES.INICIO;
  ADMINISTRATION = ROUTES.INTERNAL_ROUTES.ADMINISTRATION + '/' + ROUTES.INTERNAL_ROUTES.CLIENT;


  status: string;
  userProfile: KeycloakProfile | null = null;

  public isLoggedIn = false;
  public userRoles: string[] = [];
  userAsAdmin: boolean;

  constructor(private readonly keycloak: KeycloakService, private router: Router, private clientService: ClientService) { }

  async ngOnInit() {
    this.userProfile = await this.keycloak.loadUserProfile();

    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.userRoles = this.keycloak.getUserRoles()
    } else this.logout();

    if (this.userRoles.indexOf('admin') != -1)
      this.userAsAdmin = true;
  }

  public logout() {
    this.keycloak.logout(location.origin + '/' + this.INICIO);
  }

  backToAdminPanel(){
    this.clientService.removeClientPersonified();
    this.router.navigateByUrl(this.ADMINISTRATION);

  }



}
