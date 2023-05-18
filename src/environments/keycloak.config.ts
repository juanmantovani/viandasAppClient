
import { KeycloakConfig } from "keycloak-js";

export const keycloakConfig : KeycloakConfig = {
  //url : 'http://localhost:9000/auth',
  url : 'http://192.168.1.5:9000/auth',
  //giturl : 'http://vps-3175170-x.dattaweb.com/auth/',
  realm: 'viandas',
  clientId: 'viandas'
}