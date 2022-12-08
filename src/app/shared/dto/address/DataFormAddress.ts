import { Address } from "../../models/Address";
import { Client } from "../../models/Client";

export class DataFormAddress{
    address: Address = new Address(null);
    actionForm: string;
    client : Client = new Client(null);
}