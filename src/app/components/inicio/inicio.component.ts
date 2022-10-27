import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { GetBannerIndexResponse } from 'src/app/shared/dto/carrousel/GetBannerIndexResponse';
import { GetMenuResponse } from 'src/app/shared/dto/menu/GetMenuResponse';
import { Category } from 'src/app/shared/models/Category';
import { MenuViewer } from 'src/app/shared/models/MenuViewer';
import { TurnViewer } from 'src/app/shared/models/TurnViewer';
import { CarrouselService } from 'src/app/shared/services/carrousel.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css', '../../app.component.css'],
  providers: [NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None

})



export class InicioComponent implements OnInit {
  menuViewer : MenuViewer;
  turnsViewer : TurnViewer;
  URLAPI = environment.urlApi;
  mensajeWhatsApp = "Hacenos tu consulta por WhatsApp!";
  aboutUsText = "Somos Valentina y Mariana, ambas Licenciadas en Nutrición. Realizamos viandas equilibradas y adaptadas a patologías.";
  viewMenuByCategory : boolean = false;
  category : Category;
  listUrlImage : string[];


  constructor(config: NgbCarouselConfig, 
    private carrouselService : CarrouselService,
    private menuService: MenuService,
    ) {
    config.interval = 6000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
    config.showNavigationIndicators = true;
    config.animation = true;

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
      this.menuViewer = new MenuViewer (res.menuViewer);
      this.turnsViewer = this.menuViewer.turnsViewer[0];
    })

  }

  showMenuByCategory(category : Category){
    this.viewMenuByCategory = true;
    this.category = category;
  }

}
