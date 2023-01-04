import {
  Component,
  OnInit,
  Inject,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeliveryDriver } from 'src/app/shared/models/DeliveryDriver';
import { Tanda } from 'src/app/shared/models/Tanda';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tanda-form',
  templateUrl: './tanda-form.component.html',
  styleUrls: ['./tanda-form.component.css']
})
export class TandaFormComponent implements OnInit {

  result: Tanda;
  form: FormGroup;
  listDeliveryDriver: DeliveryDriver[];
  idDeliveryDriverSelected: number;
  URLAPI = environment.urlApi;
  messageError = "";

  @Output() onSubmit: EventEmitter<Tanda | null>;

  constructor(
    public dialogRef: MatDialogRef<TandaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onSubmit = new EventEmitter<Tanda | null>();
    this.form = this.generateForm();
  }

  ngOnInit() {
    this.listDeliveryDriver = this.data.listDeliveryDriver;
    this.idDeliveryDriverSelected = this.data.tanda?.deliveryDriver?.id;
  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.tanda?.id),
      description: new FormControl(this.data.tanda?.description, Validators.required),
      hourStart: new FormControl(this.data.tanda?.hourStart),
      hourEnd: new FormControl(this.data.tanda?.hourEnd),
      deliveryDriver: new FormControl(this.data.tanda?.deliveryDriver),
    });
  }

  onClickCancel() {
    this.dialogRef.close();
  }
  onClickSave() {
    this.result = this.form.getRawValue();
    this.result.deliveryDriver = this.listDeliveryDriver.find(d => d.id == this.idDeliveryDriverSelected)!
    this.onSubmit.emit(this.result);
  }

}
