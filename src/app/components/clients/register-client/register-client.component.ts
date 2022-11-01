import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Client } from 'src/app/shared/models/Clients';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit {
  result: Client;
  form: FormGroup;
  URLAPI = environment.urlApi;
  userProfile: KeycloakProfile | null = null;


  @Output() onSubmit: EventEmitter<Client | null>;


  constructor(
    public dialogRef: MatDialogRef<RegisterClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly keycloak: KeycloakService
  ) {
    this.onSubmit = new EventEmitter<Client | null>();
    this.form = this.generateForm();
  }

  async ngOnInit() {
    this.userProfile = await this.keycloak.loadUserProfile();

  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.client?.id),
      phone_primay: new FormControl(this.data.client?.phone_primay, Validators.required),
      phone_secondary: new FormControl(this.data.client?.phone_secondary),
      street: new FormControl(this.data.client.direction?.street, Validators.required),
      number: new FormControl(this.data.client.direction?.number),
      floor: new FormControl(this.data.client.direction?.floor),
      departament: new FormControl(this.data.client.direction?.departament)
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
