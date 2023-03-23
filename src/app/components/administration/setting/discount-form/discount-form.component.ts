import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Discount } from 'src/app/shared/models/Discount';


@Component({
  selector: 'app-discount-form',
  templateUrl: './discount-form.component.html',
  styleUrls: ['./discount-form.component.css']
})
export class DiscountFormComponent implements OnInit {

  result: Discount;
  form: FormGroup;
  URLAPI = environment.urlApi;

  @Output() onSubmit: EventEmitter<Discount | null>;


  constructor(
    public dialogRef: MatDialogRef<DiscountFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onSubmit = new EventEmitter<Discount | null>();
    this.form = this.generateForm();
  }

  ngOnInit(): void {
  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.discount?.id),
      description: new FormControl(this.data.discount?.description),
      cant: new FormControl(this.data.discount?.cant),
      percentage: new FormControl(this.data.discount?.percentage, [Validators.min(1), Validators.max(100)])

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
