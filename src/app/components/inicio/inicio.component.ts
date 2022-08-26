import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbCarouselConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { GetBannerIndexResponse } from 'src/app/shared/dto/carrousel/GetBannerIndexResponse';
import { CarrouselService } from 'src/app/shared/services/carrousel.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css', '../../app.component.css'],
  providers: [NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None

})
export class InicioComponent implements OnInit {

  listUrlImage: string[];

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
    this.listUrlImage = [];   
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }

  ngOnInit(): void {
    this.getBannersIndex();
  }
  
  async getBannersIndex() {
    await this.carrouselService.getBannersIndex().subscribe((res: GetBannerIndexResponse) => {
      this.listUrlImage = res.urlImage;
    })
  }

}
