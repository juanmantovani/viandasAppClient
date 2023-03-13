
import { KeycloakConfig } from "keycloak-js";

export const keycloakConfig : KeycloakConfig = {
  url : 'http://localhost:9000/auth',
  //url : 'http://vps-3175170-x.dattaweb.com/auth/',
  realm: 'viandas',
  clientId: 'viandas'
}