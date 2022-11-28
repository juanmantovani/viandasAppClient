import { KeycloakProfile } from "keycloak-js";
import { Client } from "../../models/Client";

export class DataFormRegisterClient{
    client: Client = new Client(null);
    actionForm: string;
    userProfile: KeycloakProfile
}