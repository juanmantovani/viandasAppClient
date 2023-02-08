import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import  * as ROUTES  from '../../../shared/routes/index.routes'


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css','../../../app.component.css']
})
export class SidenavComponent implements OnInit {

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

  status: string;

  public userProfile: KeycloakProfile | null = null;
  public isLoggedIn = false;
  public userRoles: string [] = [];




  constructor(private readonly keycloak: KeycloakService, private router : Router ) { }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.userRoles = this.keycloak.getUserRoles()
    } else this.logout();
  }

  public logout() {
    this.keycloak.logout();
    this.router.navigate(['/inicio'])
  }

 }