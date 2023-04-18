import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { GetBannerIndexResponse } from 'src/app/shared/dto/carrousel/GetBannerIndexResponse';
import { GetCategoryResponse } from 'src/app/shared/dto/category/GetCategoryResponse';
import { Category } from 'src/app/shared/models/Category';
import { CarrouselService } from 'src/app/shared/services/carrousel.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import  * as ROUTES  from '../../shared/routes/index.routes'
import { SettingService } from 'src/app/shared/services/setting.service';
import { GetZoneResponse } from 'src/app/shared/dto/setting/GetZoneResponse';
import { Zone } from 'src/app/shared/models/Zone';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css', '../../app.component.css'],
  providers: [NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None

})

export class InicioComponent implements OnInit {
  ADMINISTRATION = ROUTES.INTERNAL_ROUTES.ADMINISTRATION+'/'+ROUTES.INTERNAL_ROUTES.ORDER;
  CLIENT = ROUTES.INTERNAL_ROUTES.CLIENT+'/'+ROUTES.INTERNAL_ROUTES.ORDER
  INICIO = ROUTES.INTERNAL_ROUTES.INICIO;

  URLAPI = environment.urlApi;
  mensajeWhatsApp = "Hacenos tu consulta por WhatsApp!";
  viewMenuByCategory : boolean = false;
  category : Category;
  categories : Category[] = [];
  listUrlImage : string[] = [];
  panelOpenState = false;
  public isLoggedIn = false;
  public userRoles: string [] = [];
  public userProfile: KeycloakProfile | null = null;
  zones: Zone[] = [];

  constructor(config: NgbCarouselConfig, 
    private carrouselService : CarrouselService,
    //private menuService: MenuService,
    private categoryService: CategoryService,
    private readonly keycloak: KeycloakService,
    private router: Router,
    private settingSerive: SettingService,

    ) {
    config.interval = 6000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
    config.showNavigationIndicators = true;
    config.animation = true;

  }

  public login() {
    this.keycloak.login();
  }

  async ngOnInit() {
    this.getBannersIndex();
    await this.getCategories();
    await this.getZone();

    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.userRoles = this.keycloak.getUserRoles()
    }
  }

  async getZone() {
    await this.settingSerive.getZone().subscribe((res: GetZoneResponse) => {
      this.zones = res.zones;
    })

  }
  
  async getBannersIndex() {
    await this.carrouselService.getBannersIndex().subscribe((res: GetBannerIndexResponse) => {
      this.listUrlImage = res.urlImage;
    })
  }

  onClickIngresar(){
    if (this.userRoles.indexOf('admin') != -1)
    {
      this.router.navigateByUrl(this.ADMINISTRATION);
      return false
    }
      this.router.navigateByUrl(this.CLIENT);
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

  onClickBack(){
    this.viewMenuByCategory = false
  }

}
