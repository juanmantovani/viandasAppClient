import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetPathologyResponse } from 'src/app/shared/dto/pathology/GetPathologyResponse';
import { City } from 'src/app/shared/models/City';
import { Client } from 'src/app/shared/models/Clients';
import { Pathology } from 'src/app/shared/models/Pathology';
import { ClientService } from 'src/app/shared/services/client.service';
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
  idCitySelected: number;


  @Output() onSubmit: EventEmitter<Client | null>;


  constructor(
    public dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService : ClientService,
    private pathologyService : PathologyService
  ) {
    this.onSubmit = new EventEmitter<Client | null>();
    this.form = this.generateForm();
  }

  ngOnInit() {
    this.idCitySelected = this.data.direction?.city?.id;
    this.getPathologies();

  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.client?.id),
      phonePrimary: new FormControl(this.data.client?.phonePrimary, Validators.required),
      street: new FormControl(this.data.client.direction?.street, Validators.required),
      number: new FormControl(this.data.client.direction?.number),
      floor: new FormControl(this.data.client.direction?.floor),
      departament: new FormControl(this.data.client.direction?.departament),
      bornDate : new FormControl(this.data.client?.bornDate,Validators.required),
      obsClient: new FormControl(this.data.client?.observation),
      obsDirection : new FormControl(this.data.direction?.observation)
    });
  }

  onClickCancel() {
    this.dialogRef.close();
  }

  onClickSave() {
    this.result = this.form.getRawValue();
    this.result.pathologies = this.listPathologies
    this.onSubmit.emit(this.result);
  }

  async getPathologies(){
    await this.pathologyService.getPathology().subscribe((res : GetPathologyResponse) => {
      this.listPathologies = res.pathologies;
    })
  }

}
