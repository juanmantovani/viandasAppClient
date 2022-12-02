import { Address } from "../../models/Address";

export class DataFormAddress{
    idClient : number;
    address: Address = new Address(null);
    actionForm: string;
}