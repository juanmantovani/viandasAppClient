import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GetDeliveryRequest } from 'src/app/shared/dto/delivery/GetDeliveryRequest';
import { GetDeliveryResponse } from 'src/app/shared/dto/delivery/GetDeliveryResponse';
import { DeliveryDriver } from 'src/app/shared/models/DeliveryDriver';
import { DeliveryService } from 'src/app/shared/services/delivery.service';

@Component({
  selector: 'app-delivery-report',
  templateUrl: './delivery-report.component.html',
  styleUrls: ['./delivery-report.component.css']
})
export class DeliveryReportComponent implements OnInit {

  @Input() listDeliveryDriver: DeliveryDriver[];

  idDeliveryDriverSelected: number;
  range: FormGroup;


  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.range = this.generateForm();
    this.idDeliveryDriverSelected = 0;

  }

  generateForm(): FormGroup {
    return new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
  }

  async generateReport() {
    var range = this.range.getRawValue();
    
    const request: GetDeliveryRequest = {
      idDeliveryDriver : this.idDeliveryDriverSelected != 0 ? this.idDeliveryDriverSelected : undefined,
      dateStart: range.start,
      dateEnd: range.end
    }

    await this.deliveryService.getDelivery(request).subscribe((res: GetDeliveryResponse) => {
      console.log(res);
    })
  }

}
