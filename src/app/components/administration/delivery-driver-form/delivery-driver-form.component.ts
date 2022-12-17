import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeliveryDriver } from 'src/app/shared/models/DeliveryDriver';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delivery-driver-form',
  templateUrl: './delivery-driver-form.component.html',
  styleUrls: ['./delivery-driver-form.component.css']
})
export class DeliveryDriverFormComponent implements OnInit {

  result: DeliveryDriver;
  form: FormGroup;
  URLAPI = environment.urlApi;
  messageError = "";

  @Output() onSubmit: EventEmitter<DeliveryDriver | null>;


  constructor(
    public dialogRef: MatDialogRef<DeliveryDriverFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onSubmit = new EventEmitter<DeliveryDriver | null>();
    this.form = this.generateForm();
  }

  ngOnInit(): void {
  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.deliveryDriver?.id),
      dni: new FormControl(this.data.deliveryDriver?.dni, Validators.required),
      name: new FormControl(this.data.deliveryDriver?.name, Validators.required),
      lastName: new FormControl(this.data.deliveryDriver?.lastName, Validators.required),
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
