import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetClientByIdTandaRequest } from 'src/app/shared/dto/client/GetClientByIdTandaRequest';
import { GetClientResponse } from 'src/app/shared/dto/client/GetClientResponse';
import { Client } from 'src/app/shared/models/Client';
import { Tanda } from 'src/app/shared/models/Tanda';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-tanda-info',
  templateUrl: './tanda-info.component.html',
  styleUrls: ['./tanda-info.component.css']
})
export class TandaInfoComponent implements OnInit {
  @Input() listClient: Client[];
  @Input() tanda: Tanda;
  viewAssign : boolean;
  viewRemove: boolean;
  viewListClient: boolean;

  constructor(private clientService: ClientService,) { }

  ngOnInit(): void {
    this.getAddresses();
  }

  onClickAssign() {
    this.viewRemove = false;
    this.viewListClient = false;
    this.viewAssign = true;
  }

  onClickRemove() {
    this.viewAssign = false;
    this.viewListClient = false;
    this.viewRemove = true;
  }

  onClickViewList(){
    this.viewAssign = false;
    this.viewRemove = false;
    this.viewListClient = true;
  }

  getAddresses(){
    const request: GetClientByIdTandaRequest = {
      idTanda: [this.tanda.id]
    }
    this.clientService.getClientByIdTanda(request).subscribe((res: GetClientResponse) => {
      this.listClient = res.client
      this.onClickViewList();
    })
  }

}
