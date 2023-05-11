import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Utils } from '../../../utils';
import { MapGeocoder } from '@angular/google-maps';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() street: string;
  @Input() number: string;

  @Output() geoCodingResult: EventEmitter<any> = new EventEmitter();
  @Output() clickBack: EventEmitter<boolean> = new EventEmitter();

  widthMap: string = '100%';
  heightMap: string = '450';
  notGeocoding: string = '';

  display: any;
  zonesMap: any = [];
  selectAddress: google.maps.LatLng = new google.maps.LatLng(0,0);
  center: google.maps.LatLng = new google.maps.LatLng(0,0);
  zoom = 18;
  options = {
    mapTypeControl: false,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  }

  polygonOptions = {
    visible: false
  }

  markerOptions: google.maps.MarkerOptions = {
    draggable: true
  };
  markerPositions: google.maps.LatLngLiteral[] = [];


  constructor(private geocoder: MapGeocoder) {

  }

  async ngOnInit() {
    if(window.screen.height < 800){
      this.heightMap = '300';
    }
    this.zonesMap = Utils.getZones();
      this.geocodingStreet();
    
  }

  geocodingStreet(){
    var address = this.street +' '+ this.number + ', Paraná, Entre Ríos, Argentina'
    this.geocoder.geocode({ address: address }).subscribe(({ results, status }) => {
      if (status == 'OK') {
        var address = { 
          lat: results[0].geometry?.location?.lat(), 
          lng: results[0].geometry?.location?.lng() 
        }
        this.markerPositions.push(address);
        this.center = new google.maps.LatLng(address);
        this.selectAddress = new google.maps.LatLng(address);
        } else {
          this.notGeocoding = 'No fue posible encontrar la dirección ingresada'
        }

      });
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.selectAddress = new google.maps.LatLng(event.latLng.toJSON());

  }

  async getIdZone(){
    for (let i = 0; i < 3; i++) {
    const isInZone = google.maps.geometry.poly.containsLocation(
      this.selectAddress,
      new google.maps.Polygon({ paths:this.zonesMap[i]})
    );
    if (isInZone)
      return i+1
    }
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng);
  }

  async onClickValidateAddress(){
    var address = { 
      lat: this.selectAddress?.lat(), 
      lng: this.selectAddress?.lng(),
      idZone: await this.getIdZone() 
    }
    this.geoCodingResult.emit(address)
  }

  onClickBack(){
    this.clickBack.emit(true);
  }


}
