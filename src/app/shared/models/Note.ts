export class Note {
    id: number;
    note: string;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.note = data.note;
        }
    }
}