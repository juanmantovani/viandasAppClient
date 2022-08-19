import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbCarouselConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { GetBanneRequest } from 'src/app/shared/dto/Carrousel/GetBannerRequest';
import { GetBannerResponse } from 'src/app/shared/dto/Carrousel/GetBannerResponse';
import { Banner } from 'src/app/shared/models/Banner';
import { CarrouselService } from 'src/app/shared/services/carrousel.service';




@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css', '../../app.component.css'],
  providers: [NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None

})
export class InicioComponent implements OnInit {

  listBanner: Banner[];

  mensajeWhatsApp = "Hacenos tu consulta por WhatsApp!";
  aboutUsText = "Somos Valentina y Mariana, ambas Licenciadas en Nutrición. Realizamos viandas equilibradas y adaptadas a patologías."


  constructor(config: NgbCarouselConfig, 
    private offcanvasService: NgbOffcanvas,
    private carrouselService : CarrouselService) {
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
    config.showNavigationIndicators = false;
    config.animation = false;
    this.listBanner = [];   
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }

  ngOnInit(): void {
    this.getBanners();
  }
  
  async getBanners() {
    const getBanneRequest: GetBanneRequest = {
      onlyActive : true
    }
    await this.carrouselService.getBanners(getBanneRequest).subscribe((res: GetBannerResponse) => {
      this.listBanner = res.banners;
    })
  }

}
