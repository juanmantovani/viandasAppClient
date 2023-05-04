import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getAddressTakeAwayResponse } from 'src/app/shared/dto/setting/getAddressTakeAwayResponse';
import { Address } from 'src/app/shared/models/Address';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SettingService } from 'src/app/shared/services/setting.service';

@Component({
  selector: 'app-take-away-address',
  templateUrl: './take-away-address.component.html',
  styleUrls: ['./take-away-address.component.css']
})
export class TakeAwayAddressComponent implements OnInit {

  address: Address;

  constructor(
    public dialog: MatDialog,
    private settingService: SettingService,
    private dialogService: DialogService,
  ) { }

  async ngOnInit() {
    //await this.getAddressTakeAway()

    this.address = new Address({
        id: 19,
        street: "Peru",
        number: "55",
        floor: "",
        departament: "",
        observation: "",
        favourite: true,
        city: {
            "id": 1,
            "description": "Paraná",
            "cp": "3100"
        },
        idZone: 1,
        lat: "-31.73188167579209",
        lng: "-60.528494937628864"
      })
  }

  async getAddressTakeAway(){
    await this.settingService.getAddressTakeAway().subscribe((res: getAddressTakeAwayResponse)=> {
      this.address = new Address(res)
    })
  }

  onClickEditAddress(){

  }

  onClickShowAddress(){

  }

}
