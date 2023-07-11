import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { environment } from '../../environments/environment'

@Injectable()
export class DiscordSendOrder {
  
  userProfile: KeycloakProfile | null = null;
  private readonly discrodUrl = environment.urlDiscordOrder;

  constructor(private keycloak: KeycloakService) {

  }

  async sendOrder(message: string) {
    const request = new XMLHttpRequest();
    request.open("POST", this.discrodUrl);
    request.setRequestHeader('Content-type', 'application/json');

    this.userProfile = await this.keycloak.loadUserProfile();

    const params = {
      username: this.userProfile.email,
      content: message
  }

  request.send(JSON.stringify(params));

  }


}
