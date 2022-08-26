import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.css']
})
export class FoodFormComponent implements OnInit {

  result: Food;
  form: FormGroup;
  image: Blob;
  nameImage?: string | null;

  @Output() onSubmit: EventEmitter<Food | null>;

  constructor(
    public dialogRef: MatDialogRef<FoodFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onSubmit = new EventEmitter<Food | null>();
    this.form = this.generateForm();
  }

  ngOnInit(): void {}

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.food?.id),
      title: new FormControl(this.data.food?.title, Validators.required),
      description: new FormControl(this.data.food?.description),
      category: new FormControl(this.data.food?.category, Validators.required),
    });
  }

  onClickCancel() {
    this.dialogRef.close();
  }
  onClickSave() {
    this.result = this.form.getRawValue();
    this.result.image = this.image;
    this.onSubmit.emit(this.result);
  }

  onChangeDateStart(e: any) {
    const date: Date = e?.value;
  }

  onSelect(event: any) {
    this.image = event.addedFiles[0];
    this.nameImage = event.addedFiles[0].name;
  }

  onRemove(event: any) {
    this.nameImage = null;
  }
}
