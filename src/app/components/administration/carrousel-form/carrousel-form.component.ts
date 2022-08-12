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
import { Banner } from 'src/app/shared/models/Banner';

@Component({
  selector: 'app-carrousel-form',
  templateUrl: './carrousel-form.component.html',
  styleUrls: ['./carrousel-form.component.css'],
})
export class CarrouselFormComponent implements OnInit {
  result: Banner;
  form: FormGroup;
  minDateEnd: Date;
  image: Blob;
  nameImage?: string | null;

  @Output() onSubmit: EventEmitter<Banner | null>;

  constructor(
    public dialogRef: MatDialogRef<CarrouselFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onSubmit = new EventEmitter<Banner | null>();
    this.minDateEnd = this.data?.dateStart ? this.data.dateStart : new Date();
    this.form = this.generateForm();
  }

  ngOnInit(): void {}

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.banner?.id),
      tittle: new FormControl(this.data.banner?.tittle, Validators.required),
      dateStart: new FormControl(
        this.data.banner?.dateStart,
        Validators.required
      ),
      dateEnd: new FormControl(this.data.banner?.dateEnd, Validators.required),
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
    if (date) this.minDateEnd = date;
  }

  onSelect(event: any) {
    this.image = event.addedFiles[0];
    this.nameImage = event.addedFiles[0].name;
  }

  onRemove(event: any) {
    this.nameImage = null;
  }
}