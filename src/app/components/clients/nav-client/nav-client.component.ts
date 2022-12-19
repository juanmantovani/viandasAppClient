import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import  * as ROUTES  from '../../../shared/routes/index.routes'


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



  status: string;
  userProfile: KeycloakProfile | null = null;

  public isLoggedIn = false;
  public userRoles: string [] = [];



  constructor(private readonly keycloak: KeycloakService, private router : Router) { }

  async ngOnInit() {
    this.userProfile = await this.keycloak.loadUserProfile(); 
    
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.userRoles = this.keycloak.getUserRoles()
    }
  }

  public logout() {
    this.keycloak.logout();
    this.router.navigate(['/inicio'])
  }

  

}
