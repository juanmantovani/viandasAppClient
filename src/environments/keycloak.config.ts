import { KeycloakConfig } from 'keycloak-js';
import { environment } from './environment';

export const keycloakConfig: KeycloakConfig = {
  url: environment.keycloakUrl,
  realm: 'viandas',
  clientId: 'viandas',
};
