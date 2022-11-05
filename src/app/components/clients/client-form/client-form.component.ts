import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { GetCityResponse } from 'src/app/shared/dto/city/GetCityResponse';
import { City } from 'src/app/shared/models/City';
import { Client } from 'src/app/shared/models/Clients';
import { ClientService } from 'src/app/shared/services/client.service';
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
  idCitySelected: number;


  @Output() onSubmit: EventEmitter<Client | null>;


  constructor(
    public dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService : ClientService
  ) {
    this.onSubmit = new EventEmitter<Client | null>();
    this.form = this.generateForm();
  }

  ngOnInit() {
    this.idCitySelected = this.data.direction?.city?.id;
    this.getCities();


  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.client?.id),
      phone_primay: new FormControl(this.data.client?.phone_primay, Validators.required),
      phone_secondary: new FormControl(this.data.client?.phone_secondary),
      street: new FormControl(this.data.client.direction?.street, Validators.required),
      number: new FormControl(this.data.client.direction?.number),
      floor: new FormControl(this.data.client.direction?.floor),
      departament: new FormControl(this.data.client.direction?.departament),
      born_date : new FormControl(this.data.client?.born_date,Validators.required),
      city : new FormControl(this.data.client.direction?.departament.city)
    });
  }

  onClickCancel() {
    this.dialogRef.close();
  }

  onClickSave() {
    this.result = this.form.getRawValue();
    //this.result.direction.city = new City(this.listCities.find(c => c.id == this.idCitySelected))
    console.log(this.result)
    this.onSubmit.emit(this.result);
  }

  async getCities() {
    await this.clientService.getCities().subscribe((res: GetCityResponse) => {
      this.listCities = res.cities;
    })
  }

}
