
import { KeycloakConfig } from "keycloak-js";

export const keycloakConfig: KeycloakConfig = {
  //url : 'http://192.168.1.5:9000/auth',
  url : 'http://localhost:9000/auth',
  //url: 'https://backend.integralviandas.com.ar/auth',
  realm: 'viandas',
  clientId: 'viandas'
}