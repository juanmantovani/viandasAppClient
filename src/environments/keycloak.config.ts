
import { KeycloakConfig } from "keycloak-js";

export const keycloakConfig : KeycloakConfig = {
  url : 'http://localhost:9000/auth',
  realm: 'viandas',
  clientId: 'viandas'
}