import { Component, OnInit, Output, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'src/app/shared/models/Address';
import { AddressService } from 'src/app/shared/services/address.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit, AfterViewInit {
  result: Address;
  form: FormGroup;
  map: boolean;
  validateAddress: boolean;
  autocomplete: google.maps.places.Autocomplete;


  @Output() onSubmit: EventEmitter<Address | null>;

  constructor(
    public dialogRef: MatDialogRef<AddressFormComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onSubmit = new EventEmitter<Address | null>();
    this.form = this.generateForm();
    this.result = new Address(null);
  }

  ngAfterViewInit() {
    this.initAutocomplete();
  }

  ngOnInit(): void {

    this.form.valueChanges.subscribe((value) => {
     console.log(this.form.controls);
     });
  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.address?.id),
      street: new FormControl(this.data.address?.street, this.requiredValidator),
      number: new FormControl(this.data.address?.number, this.requiredValidator),
      floor: new FormControl(this.data.address?.floor),
      departament: new FormControl(this.data.address?.departament),
      observation: new FormControl(this.data.address?.observation),
      lat: new FormControl(''),
      lng: new FormControl(''),
      idZone: new FormControl(''),
    });
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
    this.result = this.form.getRawValue()
    this.onSubmit.emit(this.result);
  }

  onClickSearchAddress(){
    this.map = true;

  }

  onClickBack(){
    this.map = false;
  }

  geoCodingResult(result: any){
    if (result.idZone){
      this.validateAddress = true;
      this.map = false;
      // this.result.lat = result.lat;
      // this.result.lng = result.lng;
      // this.result.idZone = result.idZone
    } else {
      console.log(this.form.controls.street)
      this.map = false;
      this.form.controls.street.setErrors({invalid: true, mensaje: 'El domicilio debe estar dentro de la zona de reparto'});
      console.log(this.form.controls.street)

    }
  }

  initAutocomplete(){
    const input = document.getElementById("street") as HTMLInputElement;
    const options = {
      componentRestrictions: { country: "ar" },
      setTypes: ['address']
    }
    this.autocomplete = new google.maps.places.Autocomplete(input, options)
  }

  

 


}
