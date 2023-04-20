import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetPathologyResponse } from 'src/app/shared/dto/pathology/GetPathologyResponse';
import { City } from 'src/app/shared/models/City';
import { Client } from 'src/app/shared/models/Client';
import { Address } from 'src/app/shared/models/Address';
import { Pathology } from 'src/app/shared/models/Pathology';
import { PathologyService } from 'src/app/shared/services/pathology.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  result: Client;
  form: FormGroup;
  URLAPI = environment.urlApi;
  listCities: City[];
  listPathologies: Pathology[];
  date: Date = new Date();
  address: Address = new Address(null);

  validateAddress: boolean = false;
  map: boolean = false;

  @Output() onSubmit: EventEmitter<Client | null>;

  constructor(
    public dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pathologyService: PathologyService
  ) {
    this.onSubmit = new EventEmitter<Client | null>();
    this.form = this.generateForm();
    this.result = new Client(null);
    this.result.addresses = [];
    this.listPathologies = [];
  }

  ngOnInit() {
    this.mapperPathology();
  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.client?.id),
      phonePrimary: new FormControl(this.data.client?.phonePrimary, [this.requiredValidator, this.phoneValidator]),
      phoneSecondary: new FormControl(this.data.client?.phoneSecondary, this.phoneValidator),
      street: new FormControl('',this.data.actionForm == 'Add' ? this.requiredValidator : null),
      number: new FormControl('',this.data.actionForm == 'Add' ? this.requiredValidator : null),
      floor: new FormControl(),
      departament: new FormControl(),
      bornDate: new FormControl(this.data.client?.bornDate, [this.requiredValidator, this.dateValidator]),
      obsClient: new FormControl(this.data.client?.observation),
      obsAddress: new FormControl(),
      lat: new FormControl(''),
      lng: new FormControl(''),
      idZone: new FormControl(''),

    });
  }
  
  ngAfterViewInit() {
  }

  phoneValidator(formControl: any) {
    const value = formControl.value;
    if (value && !/^(\d{2,5}[-,\s])?(\d{5,10})$/.test(value))
      return {
        mensaje: "Debe ingresar un número de teléfono válido"
      };
    return null;
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
    this.mapperClient();
    this.result.pathologies = this.listPathologies.filter(c => c.checked);
    this.onSubmit.emit(this.result);
    this.cleanList()
  }

  async getPathologies() {
    await this.pathologyService.getPathology().subscribe((res: GetPathologyResponse) => {
      this.listPathologies = res.pathologies;
    })
  }

  mapperClient() {
    var data = this.form.getRawValue();
    this.result.id = data["id"];
    const date = new Date(data["bornDate"]);
    date.setDate(date.getDate() + 1);
    this.result.bornDate = date;
    this.result.observation = data["obsClient"];
    this.result.phonePrimary = data["phonePrimary"];
    this.result.phoneSecondary = data["phoneSecondary"];

    var address: Address = {
      id: 0,
      favourite: true,
      street: data["street"],
      number: data["number"],
      floor: data["floor"],
      departament: data["departament"],
      observation: data["obsAddress"],
      city: new City(null),
      lat: this.address?.lat?.toString(),
      lng: this.address?.lng?.toString(),
      idZone: this.address.idZone
    }
    this.result.addresses.push(address)
  }

  mapperPathology() {
    if (this.data.actionForm == "Edit") {
      this.listPathologies = [];
      for (let pat of this.data.client?.pathologies) {
        this.listPathologies.push(new Pathology(pat))
      }
    }
    else {
      this.getPathologies()
    }
  }

  cleanList() {
    this.listPathologies.forEach(pat => pat.checked = false)
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
      this.address.lat = result.lat;
      this.address.lng = result.lng;
      this.address.idZone = result.idZone
    } else {
      this.map = false;
      this.form.controls.street.setErrors({invalid: true, mensaje: 'El domicilio debe estar dentro de la zona de reparto'})
    }
  }
}
