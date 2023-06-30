import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GetDeliveryRequest } from 'src/app/shared/dto/delivery/GetDeliveryRequest';
import { GetDeliveryResponse } from 'src/app/shared/dto/delivery/GetDeliveryResponse';
import { GetReportByDeliveryResponse } from 'src/app/shared/dto/delivery/GetReportByDeliveryResponse';
import { Delivery } from 'src/app/shared/models/Delivery';
import { DeliveryDriver } from 'src/app/shared/models/DeliveryDriver';
import { DeliveryService } from 'src/app/shared/services/delivery.service';
import { environment } from 'src/environments/environment';
import { Utils } from 'src/app/utils';
import { DeliveryReportTable } from 'src/app/shared/models/DeliveryReportTable';

@Component({
  selector: 'app-delivery-report',
  templateUrl: './delivery-report.component.html',
  styleUrls: ['./delivery-report.component.css'],
})
export class DeliveryReportComponent implements OnInit {

  @Input() listDeliveryDriver: DeliveryDriver[];

  idDeliveryDriverSelected: number;
  range: FormGroup;
  showResults: boolean;
  URLAPI = environment.url;
  deliveriesDriver : DeliveryDriver[] = [];
  noResults: boolean;
  deliveryReportTable : DeliveryReportTable [] = [];

  dataSource: any;
  days: any [] = [];
  displayedColumns: string[] = ['order', 'client', 'address'];

  constructor(private deliveryService: DeliveryService, private http: HttpClient) { }

  ngOnInit(): void {
    this.range = this.generateForm();
    this.idDeliveryDriverSelected = 0;

  }

  restartSearch(){
    this.showResults = false;
    this.noResults = false;
    this.deliveriesDriver = [];
    this.deliveryReportTable = [];
    this.days = [];
    this.displayedColumns = ['order', 'client', 'address'];

  }

  generateForm(): FormGroup {
    return new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
  }

  async generateReport() {
    this.restartSearch();
    var range = this.range.getRawValue();
    
    const request: GetDeliveryRequest = {
      idDeliveryDriver : this.idDeliveryDriverSelected != 0 ? this.idDeliveryDriverSelected : undefined,
      dateStart: range.start,
      dateEnd: range.end
    }
    this.generateColsWithDays(range.start, range.end);
    await this.deliveryService.getDelivery(request).subscribe((res: GetDeliveryResponse) => {
      if (res.deliveryDriver) {
        this.deliveriesDriver = res.deliveryDriver;
        this.generateTable(this.deliveriesDriver);
        setTimeout(() =>{
          this.showResults = true;
        })
        return
      }
      this.noResults = true;
    })
  }

  generateColsWithDays(start: Date, end: Date) {
    this.days = Utils.getDaysOfDate(start, end);
    setTimeout(() =>{
      this.days?.sort((a,b)=>b?.date.getTime()-a?.date.getTime())
      this.days.forEach(day => {
        if (day)
          this.displayedColumns.splice(3,0, day.date.toString().toLowerCase())
      });
    })
  }

  generateTable(deliveriesDriver : DeliveryDriver []){
    this.deliveryReportTable = [];
    deliveriesDriver.forEach(deliveryDriver => {
      var deliveryReportTable : DeliveryReportTable = {
        idDeliveryDriver: deliveryDriver.id,
        nameDeliveryDriver: deliveryDriver.name,
        lastNameDeliveryDriver: deliveryDriver.lastName,
        clientAddressReportTable: []
      }
      const deliveries = deliveryDriver.deliveries;
      // Recorre los deliveries
      deliveries.forEach((delivery: Delivery) => {
        // Accede al cliente y dirección del delivery
        const client = delivery.client;
        const address = delivery.address;
        const idOrder = delivery.idOrder;
        // Verifica si el cliente y la address ya existe en el array clientAddressReportTable
        const existingClient = deliveryReportTable.clientAddressReportTable.find((item) => item.client.id === client.id);
        const existingAddress = deliveryReportTable.clientAddressReportTable.find((item) => item.address.id === address.id);
        // Agrega el cliente y dirección al array solo si no existen previamente
        if (!existingClient || !existingAddress) {
          deliveryReportTable.clientAddressReportTable.push({ idOrder, client, address });
        }
      });
      this.deliveryReportTable.push(deliveryReportTable);
    })

  }

  calculateTotal(deliveries: Delivery[]) : number {
    const initialValue = 0;
    const sumWithInitial = deliveries.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      initialValue
    );
    return sumWithInitial;
  }

  async onClickDownload(idDeliveryDriver: number){
    var range = this.range.getRawValue();
    
    const request: GetDeliveryRequest = {
      idDeliveryDriver : idDeliveryDriver,
      dateStart: range.start,
      dateEnd: range.end
    }

    await this.deliveryService.getReportByDelivery(request).subscribe((res: GetReportByDeliveryResponse) => {
      if (res.path) {
        this.goToLink(res.path);
      }
    })

  }

  goToLink(url: string){
    window.open(this.URLAPI + url, 'Download');

  }

  getIndexOf(idDeliveryDriver: number) : number {
    return this.deliveriesDriver.findIndex(deliveryDriver => deliveryDriver.id === idDeliveryDriver);
  }

}
