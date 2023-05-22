import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { environment } from '../../environments/environment'

@Injectable()
export class DiscordErrorLogger {
  
  userProfile: KeycloakProfile | null = null;
  private readonly webhookUrl = environment.urlDiscordLogg;

  constructor(private keycloak: KeycloakService) {

  }

  async logError(error: string) {
    const request = new XMLHttpRequest();
    request.open("POST", this.webhookUrl);
    request.setRequestHeader('Content-type', 'application/json');

    this.userProfile = await this.keycloak.loadUserProfile();

    const params = {
      username: this.userProfile.email,
      content: error
  }

  request.send(JSON.stringify(params));

  }


}
