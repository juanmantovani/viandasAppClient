import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'src/app/shared/models/Address';
import { DeliveryDriver } from 'src/app/shared/models/DeliveryDriver';
import { Vehicle } from 'src/app/shared/models/Vehicle';
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
    this.result = new DeliveryDriver(null)
    this.result.address = new Address(null),
    this.result.vehicle = new Vehicle(null)
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
      phone: new FormControl(this.data.deliveryDriver?.phone, Validators.required),
      bornDate: new FormControl(this.data.deliveryDriver?.bornDate, Validators.required),
      idAddress: new FormControl(this.data.deliveryDriver.address?.id),
      street: new FormControl(this.data.deliveryDriver.address?.street),
      number: new FormControl(this.data.deliveryDriver.address?.number),
      floor: new FormControl(this.data.deliveryDriver.address?.floor),
      departament: new FormControl(this.data.deliveryDriver?.address?.departament),
      obsAddress: new FormControl(this.data.deliveryDriver?.address?.observation),
      idVehicle: new FormControl(this.data.deliveryDriver.vehicle?.id),
      brand: new FormControl(this.data.deliveryDriver.vehicle?.brand),
      model: new FormControl(this.data.deliveryDriver.vehicle?.model),
      patent: new FormControl(this.data.deliveryDriver.vehicle?.patent),
      year: new FormControl(this.data.deliveryDriver.vehicle?.year),
    });
  }

  onClickCancel() {
    this.dialogRef.close();
  }

  onClickSave() {
    this.mapperDeliveryDriver();
    this.onSubmit.emit(this.result);
  }

  mapperDeliveryDriver() {
    var data = this.form.getRawValue();
    this.result.id = data["id"];
    this.result.dni = data["dni"];
    this.result.name = data["name"];
    this.result.lastName = data["lastName"];
    this.result.phone = data["phone"];
    this.result.bornDate = data["bornDate"];
    this.result.address.id = data["idAddress"];
    this.result.address.street = data["street"];
    this.result.address.number = data["number"];
    this.result.address.floor = data["floor"];
    this.result.address.departament = data["departament"];
    this.result.address.observation = data["obsAddress"];
    this.result.vehicle.id = data["idVehicle"];
    this.result.vehicle.brand = data["brand"];
    this.result.vehicle.model = data["model"];
    this.result.vehicle.patent = data["patent"];
    this.result.vehicle.year = data["year"];   
  }

}
