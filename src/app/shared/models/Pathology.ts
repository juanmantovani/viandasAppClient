export class Pathology {
  id: number;
  description: string;
  checked: boolean;
  color: string;

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.description = data.description;
      this.checked = data.checked;
      this.color = data.color;
    }
  }
}