import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
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

  @Input() listTanda: Tanda[]
  idTandaSelected: number;
  listClient: Client[];
  listIdAddress: number[];

  @Output() assignAddress: EventEmitter<boolean> = new EventEmitter();

  constructor(private clientService: ClientService,
    private dialogService: DialogService,
    private tandaService: TandaService) {
    this.listIdAddress = [];
  }

  ngOnInit(): void {
    this.getAddresses(0);//despues sacar esto
  }

  onChangeTanda(event : any){
    console.log(event.value)
  }

  /*async getAddresses(idTanda : number) {
    await this.clientService.getClientByIdTanda(idTanda).subscribe((res: GetClientResponse) => {
      this.listClient = res.client
    })
  }*/

  async getAddresses(idTanda : number) {
    await this.clientService.getClient().subscribe((res: GetClientResponse) => {
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
    var tanda = this.listTanda.find(t => t.id == this.idTandaSelected)
    if (await this.generateConfirm("Está a punto de quitar direcciones a " + tanda?.description + ". ¿Está seguro de realizar esta operación?") === true) {
      await this.assignAddressToTanda();
    }
  }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  async assignAddressToTanda() {
    const request: RemoveAddressToTandaRequest = {
      idTanda: this.idTandaSelected,
      idAddress: this.listIdAddress
    }
    await this.tandaService.assignAddressToTanda(request).subscribe((res: RemoveAddressToTandaResponse) => {
      this.listIdAddress = [];
      this.assignAddress.emit();
    }
    );
  }


}
