import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetClientByIdTandaRequest } from 'src/app/shared/dto/client/GetClientByIdTandaRequest';
import { GetClientResponse } from 'src/app/shared/dto/client/GetClientResponse';
import { AssignAddressToTandaRequest } from 'src/app/shared/dto/tanda/AssignAddressToTandaRequest';
import { AssignAddressToTandaResponse } from 'src/app/shared/dto/tanda/AssignAddressToTandaResponse';
import { Address } from 'src/app/shared/models/Address';
import { Client } from 'src/app/shared/models/Client';
import { Tanda } from 'src/app/shared/models/Tanda';
import { ClientService } from 'src/app/shared/services/client.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { TandaService } from 'src/app/shared/services/tanda.service';

@Component({
  selector: 'app-tanda-assign-address',
  templateUrl: './tanda-assign-address.component.html',
  styleUrls: ['./tanda-assign-address.component.css']
})
export class TandaAssignAddressComponent implements OnInit {
  @Input() tanda: Tanda;
  listClient: Client[];
  listIdAddress: number[];

  @Output() assignAddress: EventEmitter<boolean> = new EventEmitter();

  constructor(private clientService: ClientService,
    private dialogService: DialogService,
    private tandaService: TandaService) {
    this.listIdAddress = [];
  }

  ngOnInit(): void {
    this.getAddresses();
  }

  async getAddresses() {
    const request: GetClientByIdTandaRequest = {
      idTanda: []
    }
    await this.clientService.getClientByIdTanda(request).subscribe((res: GetClientResponse) => {
      this.listClient = res.client
    })
  }

  addAddressToList(address: Address) {
    if (!this.listIdAddress.includes(address.id)) {
      this.listIdAddress.push(address.id)
    }
    else {
      this.listIdAddress = this.listIdAddress.filter(a => a != address.id)
    }
  }

  async onClickAssign() {
    var tanda = this.tanda
    if (await this.generateConfirm("Está a punto de asignar direcciones a " + tanda?.description + ". ¿Está seguro de realizar esta operación?") === true) {
      await this.assignAddressToTanda();
    }
  }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  async assignAddressToTanda() {
    const request: AssignAddressToTandaRequest = {
      idTanda: this.tanda.id,
      idAddress: this.listIdAddress
    }
    await this.tandaService.assignAddressToTanda(request).subscribe((res: AssignAddressToTandaResponse) => {
      this.listIdAddress = [];
      this.getAddresses();
      this.assignAddress.emit();
    }
    );
  }

}
