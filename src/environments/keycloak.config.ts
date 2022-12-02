
import { KeycloakConfig } from "keycloak-js";

export const keycloakConfig : KeycloakConfig = {
  url : 'http://192.168.1.4:9000/auth',
  realm: 'viandas',
  clientId: 'viandas'
}