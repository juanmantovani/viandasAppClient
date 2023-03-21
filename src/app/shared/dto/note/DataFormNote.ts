import { Client } from "../../models/Client";
import { Note } from "../../models/Note";

export class DataFormNote{
    note: Note = new Note(null);
    actionForm: string;
    client: Client;
}