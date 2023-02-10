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
  date: Date = new Date();


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
      dni: new FormControl(this.data.deliveryDriver?.dni, this.requiredValidator),
      name: new FormControl(this.data.deliveryDriver?.name, this.requiredValidator),
      lastName: new FormControl(this.data.deliveryDriver?.lastName, this.requiredValidator),
      phone: new FormControl(this.data.deliveryDriver?.phone, this.requiredValidator),
      bornDate: new FormControl(this.data.deliveryDriver?.bornDate, [this.requiredValidator, this.dateValidator]),
      idAddress: new FormControl(this.data.deliveryDriver.address?.id),
      street: new FormControl(this.data.deliveryDriver.address?.street, this.requiredValidator),
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

  dateValidator(formControl: any) {
    const value = formControl.value;
    if (value && (new Date() < new Date(value)))
      return {
        mensaje: "Debe ingresar una fecha válida"
      }
    return null;

  }

  requiredValidator(formControl: any) {
    const value = formControl.value;
    if (Validators.required(formControl))
      return { mensaje: "Este campo es requerido" };
    return null;

  }

  onClickCancel() {
    this.dialogRef.close();
  }

  onClickSave() {
    this.mapperDeliveryDriver();
    if (!this.validateDNI())
      return null;
    this.onSubmit.emit(this.result);
  }

  validateDNI() {
    const dni = this.data.listDeliveryDriver?.filter((d: any) => (d.dni == this.result.dni && d.id != this.result.id));
    if (dni && (dni.length > 0)) {
      this.messageError = "DNI ya se encuentra registrado";
      return false;
    }
    return true;
  }

  mapperDeliveryDriver() {
    var data = this.form.getRawValue();
    this.result.id = data["id"];
    this.result.dni = data["dni"];
    this.result.name = data["name"];
    this.result.lastName = data["lastName"];
    this.result.phone = data["phone"];
    const date = new Date(data["bornDate"]);
    date.setDate(date.getDate() + 1);
    this.result.bornDate = date;
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
