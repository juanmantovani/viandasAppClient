import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetClientByIdTandaRequest } from 'src/app/shared/dto/client/GetClientByIdTandaRequest';
import { GetClientResponse } from 'src/app/shared/dto/client/GetClientResponse';
import { RemoveAddressToTandaRequest } from 'src/app/shared/dto/tanda/RemoveAddressToTandaRequest';
import { RemoveAddressToTandaResponse } from 'src/app/shared/dto/tanda/RemoveAddressToTandaResponse';
import { Address } from 'src/app/shared/models/Address';
import { Client } from 'src/app/shared/models/Client';
import { Tanda } from 'src/app/shared/models/Tanda';
import { ClientService } from 'src/app/shared/services/client.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { TandaService } from 'src/app/shared/services/tanda.service';

@Component({
  selector: 'app-tanda-remove-address',
  templateUrl: './tanda-remove-address.component.html',
  styleUrls: ['./tanda-remove-address.component.css']
})
export class TandaRemoveAddressComponent implements OnInit {

  @Input() tanda: Tanda;
  listClient: Client[];
  listIdAddress: number[];
  listIdTanda: number[];

  @Output() removeAddress: EventEmitter<boolean> = new EventEmitter();

  constructor(private clientService: ClientService,
    private dialogService: DialogService,
    private tandaService: TandaService) {
    this.listIdAddress = [];
    this.listIdTanda = [];
    this.listClient = [];
  }

  ngOnInit(): void {
    this.onChangeTanda()
  }

  onChangeTanda() {
    this.listIdTanda = []
    this.listIdTanda.push(this.tanda.id)
    this.getAddresses()
  }

  getAddresses() {
    const request: GetClientByIdTandaRequest = {
      idTanda: this.listIdTanda
    }
    this.clientService.getClientByIdTanda(request).subscribe((res: GetClientResponse) => {
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

  async onClickRemove() {
    var tanda = this.tanda
    if (await this.generateConfirm("Está a punto de quitar direcciones a " + tanda?.description + ". ¿Está seguro de realizar esta operación?") === true) {
      await this.removeAddressToTanda();
    }
  }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  async removeAddressToTanda() {
    const request: RemoveAddressToTandaRequest = {
      idTanda: this.tanda.id,
      idAddress: this.listIdAddress
    }
    await this.tandaService.removeAddressToTanda(request).subscribe((res: RemoveAddressToTandaResponse) => {
      this.listIdAddress = [];
      this.removeAddress.emit();
    }
    );
  }


}
