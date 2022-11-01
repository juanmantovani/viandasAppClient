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
  status: string;
  userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak: KeycloakService, private router : Router) { }

  async ngOnInit() {
    this.userProfile = await this.keycloak.loadUserProfile();   
  }

  public logout() {
    this.keycloak.logout();
    this.router.navigate(['/inicio'])
  }

  

}
