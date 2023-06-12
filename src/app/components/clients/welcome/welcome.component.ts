import { Component, HostListener, OnInit } from '@angular/core';
import { GetCategoryResponse } from 'src/app/shared/dto/category/GetCategoryResponse';
import { Category } from 'src/app/shared/models/Category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { environment } from 'src/environments/environment';
import * as ROUTES from '../../../shared/routes/index.routes'
import { Router } from '@angular/router';
import { Utils } from 'src/app/utils';
import { ViewMenuComponent } from '../../administration/menu/view-menu/view-menu.component';
import { GetMenuByCategoriesRequest } from 'src/app/shared/dto/menu/GetMenuByCategoryRequest';
import { MenuService } from 'src/app/shared/services/menu.service';
import { GetMenuResponse } from 'src/app/shared/dto/menu/getMenuResponse';
import { MenuViewer } from 'src/app/shared/models/MenuViewer';
import { MatDialog } from '@angular/material/dialog';
import { ViewDetailsCategoryComponent } from '../order/view-details-category/view-details-category.component';
import { SettingService } from 'src/app/shared/services/setting.service';
import { GetZoneResponse } from 'src/app/shared/dto/setting/GetZoneResponse';
import { Zone } from 'src/app/shared/models/Zone';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  
  ORDER = '/'+ROUTES.INTERNAL_ROUTES.CLIENT +'/'+ ROUTES.INTERNAL_ROUTES.ORDER;
  ORDERS = '/'+ROUTES.INTERNAL_ROUTES.CLIENT +'/'+ROUTES.INTERNAL_ROUTES.ORDERS;
  ADDRESSES = '/'+ROUTES.INTERNAL_ROUTES.CLIENT +'/'+ROUTES.INTERNAL_ROUTES.ADDRESSES;

  categories: Category [];
  menuViewer: MenuViewer;
  URLAPI = environment.urlApi;
  existMenu: boolean;
  zones: Zone[] = [];
  map: boolean = false;
  menu: boolean;


  constructor(
    private categoryService: CategoryService, 
    private router: Router, 
    private menuService: MenuService, 
    public dialog: MatDialog,
    private settingSerice: SettingService
    ) { }

  ngOnInit(){
    this.menu = true;
    this.getCategories();
    this.getZone();
    this.overrideBackButton();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    console.log(event)
    event.preventDefault();
    this.map = false;
    this.menu = true;
  }

  private overrideBackButton() {
    history.pushState(null, document.title, location.href);
    window.addEventListener('popstate', function(event) {
      history.pushState(null, document.title, location.href);
    });
  }

  async getCategories() {
    await this.categoryService.getCategories().subscribe((res: GetCategoryResponse) => {
      this.categories = res.categories;
    })
  }

  async onViewMenu() {
    await this.getMenuViewer()
  }

  showMenu(menuViewer: MenuViewer){
      const dialogConfig = Utils.matDialogConfigMenu();
      dialogConfig.data = this.menuViewer;
      dialogConfig.maxHeight = '95%';
      dialogConfig.maxWidth = '95%';
      const dialogRef = this.dialog.open(ViewDetailsCategoryComponent, dialogConfig);


  }

  async getMenuViewer() {
    this.existMenu = false;
    var dateStart = new Date()
    dateStart.setDate(dateStart.getDate() - 10)
    var dateEnd = new Date()
    dateEnd.setDate(dateEnd.getDate() + 10)
    var request: GetMenuByCategoriesRequest = {
      idCategory: this.categories,
      dateStart: dateStart,
      dateEnd: dateEnd
    }
    await this.menuService.getMenuViewer(request).subscribe((res: GetMenuResponse) => {
      if (res) {
        this.menuViewer = Utils.orderMenuViewerByTurn(new MenuViewer(res.menuViewer));
        this.showMenu(this.menuViewer);
      }
      if (this.menuViewer.turnsViewer?.length > 0) {
        this.existMenu = true;
      } else {
        this.existMenu = false;
      }

    })
  }

  async getZone() {
    await this.settingSerice.getZone().subscribe((res: GetZoneResponse) => {
      this.zones = res.zones;
    })

  }

  onViewZones() {
    this.map = true;
  }


}
