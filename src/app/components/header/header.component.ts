import { Component, ViewChild, OnInit, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as ROUTES from '../../shared/routes/index.routes'
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ClientService } from 'src/app/shared/services/client.service';
import { Client } from 'src/app/shared/models/Client';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../app.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild("myNameElem") myNameElem: ElementRef;
  @ViewChild("myNameElem2") myNameElem2: ElementRef;

  INICIO = ROUTES.INTERNAL_ROUTES.INICIO;
  ADMINISTRATION = ROUTES.INTERNAL_ROUTES.ADMINISTRATION + '/' + ROUTES.INTERNAL_ROUTES.ORDER;
  CLIENT = ROUTES.INTERNAL_ROUTES.CLIENT + '/' + ROUTES.INTERNAL_ROUTES.ORDERS

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public userRoles: string[] = [];
  clientPersonify : Client;

  collapsed = true;

  constructor(private router: Router,
    private readonly keycloak: KeycloakService,
    private clientService : ClientService
  ) {
  }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.userRoles = this.keycloak.getUserRoles()
      this.evaluateUser();
    }
  }

  async evaluateUser() {
    if (this.userRoles.indexOf('admin') != -1) {
      if (this.clientService.getClientPersonified()) {
        this.clientPersonify = new Client(this.clientService.getClientPersonified());
      }
    }
  }

  mostrarMenu() {
    this.myNameElem2.nativeElement.classList.toggle("list--show");
  }

  public login() {
    this.keycloak.login();
  }

  onClickIngresar() {
    if (this.userRoles.indexOf('admin') != -1) {
      this.router.navigateByUrl(this.ADMINISTRATION);
      return false
    }
    this.router.navigateByUrl(this.CLIENT);
  }

  public logout() {
    this.keycloak.logout(location.origin + '/' + this.INICIO);
  }

}