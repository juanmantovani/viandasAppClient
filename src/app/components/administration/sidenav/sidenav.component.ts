import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import  * as ROUTES  from '../../../shared/routes/index.routes'


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  opened = false;
  CARROUSEL = ROUTES.INTERNAL_ROUTES.CARROUSEL;
  FOOD = ROUTES.INTERNAL_ROUTES.FOOD;
  CATEGORY = ROUTES.INTERNAL_ROUTES.CATEGORY;
  MENU = ROUTES.INTERNAL_ROUTES.MENU;
  status: string;

  constructor(private readonly keycloak: KeycloakService, private router : Router ) { }

  ngOnInit(): void {
  }

  public logout() {
    this.keycloak.logout();
    this.router.navigate(['/inicio'])
  }

 }