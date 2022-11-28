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
      phonePrimary: new FormControl(this.data.client?.phonePrimary, Validators.required),
      phoneSecondary: new FormControl(this.data.client?.phoneSecondary),
      street: new FormControl(this.data.client.addresses[0]?.street, Validators.required),
      number: new FormControl(this.data.client.addresses[0]?.number),
      floor: new FormControl(this.data.client.addresses[0]?.floor),
      departament: new FormControl(this.data.client.addresses[0]?.departament),
      bornDate: new FormControl(this.data.client?.bornDate, Validators.required),
      obsClient: new FormControl(this.data.client?.observation),
      obsAddress: new FormControl(this.data.client.addresses[0]?.observation)
    });
  }

  onClickCancel() {
    this.dialogRef.close();
  }

  onClickSave() {
    this.mapperClient();
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
    this.result.bornDate = data["bornDate"];
    this.result.observation = data["obsClient"];
    this.result.phonePrimary = data["phonePrimary"];
    this.result.phoneSecondary = data["phoneSecondary"];

    var address: Address = {
      street: data["street"],
      number: data["number"],
      floor: data["floor"],
      departament: data["departament"],
      observation: data["obsAddress"],
      city: new City(null)
    }
    this.result.addresses.push(address)
  }

  mapperPathology(){
    if(this.data.actionForm == "Edit"){
      this.listPathologies = [];
      for (let pat of this.data.client?.pathologies){
        this.listPathologies.push(new Pathology (pat))
      }
    }
    else{
      this.getPathologies()
   }
  }

  cleanList(){
    this.listPathologies.forEach(pat => pat.checked = false)
  }
}
