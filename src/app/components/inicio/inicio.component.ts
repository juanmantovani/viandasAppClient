import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbCarouselConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { GetBannerIndexResponse } from 'src/app/shared/dto/carrousel/GetBannerIndexResponse';
import { GetMenuResponse } from 'src/app/shared/dto/menu/GetMenuResponse';
import { CategoryViewer } from 'src/app/shared/models/CategoryViewer';
import { DayViewer } from 'src/app/shared/models/DayViewer';
import { MenuViewer } from 'src/app/shared/models/MenuViewer';
import { CarrouselService } from 'src/app/shared/services/carrousel.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { environment } from 'src/environments/environment';
import {Utils} from '../../shared/utils'


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css', '../../app.component.css'],
  providers: [NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None

})


export class InicioComponent implements OnInit {
  displayedColumns: string[] = ['date', 'foodViewer'];
  menuViewer : MenuViewer;
  dataSource!: MatTableDataSource<CategoryViewer>;



  //WEEKDAY = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];


  listUrlImage: string[];
  URLAPI = environment.urlApi;

  mensajeWhatsApp = "Hacenos tu consulta por WhatsApp!";
  aboutUsText = "Somos Valentina y Mariana, ambas Licenciadas en Nutrición. Realizamos viandas equilibradas y adaptadas a patologías."


  constructor(config: NgbCarouselConfig, 
    private offcanvasService: NgbOffcanvas,
    private carrouselService : CarrouselService,
    private menuService: MenuService) {
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
    config.showNavigationIndicators = false;
    config.animation = false;
    this.listUrlImage = []; 
    this.dataSource = new MatTableDataSource<CategoryViewer>();
  
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }

 async ngOnInit() {
    this.getBannersIndex();
    await this.getMenu();
  }
  
  async getBannersIndex() {
    await this.carrouselService.getBannersIndex().subscribe((res: GetBannerIndexResponse) => {
      this.listUrlImage = res.urlImage;
    })
  }

  async getMenu(){
    await this.menuService.getMenu().subscribe((res: GetMenuResponse) => {
      console.log(res);
      this.menuViewer = new MenuViewer (res.menuViewer);
    })
  }

  getDay(date: Date): string{
    return Utils.getDayOfDate(date);
  }



}
