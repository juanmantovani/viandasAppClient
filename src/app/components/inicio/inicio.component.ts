import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { GetBannerIndexResponse } from 'src/app/shared/dto/carrousel/GetBannerIndexResponse';
import { GetCategoryResponse } from 'src/app/shared/dto/category/GetCategoryResponse';
import { Category } from 'src/app/shared/models/Category';
import { CarrouselService } from 'src/app/shared/services/carrousel.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css', '../../app.component.css'],
  providers: [NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None

})



export class InicioComponent implements OnInit {
  URLAPI = environment.urlApi;
  mensajeWhatsApp = "Hacenos tu consulta por WhatsApp!";
  aboutUsText = "Somos Valentina y Mariana, ambas Licenciadas en Nutrición. Realizamos viandas equilibradas y adaptadas a patologías.";
  viewMenuByCategory : boolean = false;
  category : Category;
  categories : Category[] = [];
  listUrlImage : string[] = [];
  panelOpenState = false;


  constructor(config: NgbCarouselConfig, 
    private carrouselService : CarrouselService,
    //private menuService: MenuService,
    private categoryService: CategoryService,

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
  await this.getCategories();
  }
  
  async getBannersIndex() {
    await this.carrouselService.getBannersIndex().subscribe((res: GetBannerIndexResponse) => {
      this.listUrlImage = res.urlImage;
    })
  }



  async getCategories() {
    await this.categoryService.getCategories().subscribe((res: GetCategoryResponse) => {
      this.categories = res.categories;
    })
  }

  showMenuByCategory(category : Category){
    this.viewMenuByCategory = true;
    this.category = category;
  }

}
