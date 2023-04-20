import { Component, OnInit, Output, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'src/app/shared/models/Address';

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
  lat: number;
  lng: number;

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
    //this.initAutocomplete();
  }

  ngOnInit(): void {
      this.setLatLng()
  }
  
  setLatLng() {
      if  (this.data.actionForm == 'Edit') {
        this.lat = +this.data.address?.lat;
        this.lng = +this.data.address?.lng;
      } else {
        this.lat = 0;
        this.lng = 0;
      } 
  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.address?.id),
      street: new FormControl(this.data.address?.street, this.requiredValidator),
      number: new FormControl(this.data.address?.number, this.requiredValidator),
      floor: new FormControl(this.data.address?.floor),
      departament: new FormControl(this.data.address?.departament),
      observation: new FormControl(this.data.address?.observation),
      lat: new FormControl(this.data.address?.lat),
      lng: new FormControl(this.data.address?.lng),
      idZone: new FormControl(this.data.address?.idZone),
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
      this.form.controls.lat.setValue(result.lat.toString());
      this.form.controls.lng.setValue(result.lng.toString());
      this.form.controls.idZone.setValue(result.idZone);
    } else {
      this.map = false;
      setTimeout(() => {
      this.form.controls.street.setErrors({invalid: true, mensaje: 'El domicilio se encuentra fuera de la zona de envíos'});
      })
    }
  }

  //Se limita la busqueda de direccioens a newBounds (contiene un rectangulo definido por southwest y northeast)
  // initAutocomplete(){
  //   const input = document.getElementById("street") as HTMLInputElement;
  //   const southwest = { lat: -31.766946, lng: -60.561824 };
  //   const northeast = { lat: -31.709393, lng: -60.475880 };
  //   const newBounds = new google.maps.LatLngBounds(southwest, northeast);
  //   const options = {
  //     componentRestrictions: { country: "ar"  },
  //     setTypes: ['address'],
  //     strictBounds: true
  //   }
  //   this.autocomplete = new google.maps.places.Autocomplete(input, options)
  //   this.autocomplete.setBounds(newBounds);

  //   google.maps.event.addListener(this.autocomplete, 'place_changed', (event: any) => {
  //     const place = this.autocomplete.getPlace();
  //     console.log(place.address_components?[0].long_name?)
  //     this.form.controls.street.setValue(place?.formatted_address)

  //   })
  // }

  

 


}
