import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Zone } from 'src/app/shared/models/Zone';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.css']
})
export class ZoneFormComponent implements OnInit {

  result: Zone;
  form: FormGroup;
  URLAPI = environment.urlApi;

  @Output() onSubmit: EventEmitter<Zone | null>;


  constructor(
    public dialogRef: MatDialogRef<ZoneFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onSubmit = new EventEmitter<Zone | null>();
    this.form = this.generateForm();
  }

  ngOnInit(): void {
  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.zone?.id),
      description: new FormControl(this.data.zone?.description),
      price: new FormControl(this.data.zone?.price),

    });
  }

  onClickCancel() {
    this.dialogRef.close();
  }
  onClickSave() {
    this.result = this.form.getRawValue();
    this.onSubmit.emit(this.result);
  }

}
