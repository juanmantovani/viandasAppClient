import { KeycloakProfile } from "keycloak-js";
import { Client } from "../../models/Client";

export class DataFormClient{
    client: Client = new Client(null);
    actionForm: string;
    userProfile?: KeycloakProfile
    isAdmin : boolean
}