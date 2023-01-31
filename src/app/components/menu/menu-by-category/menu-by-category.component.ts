import { Component, OnInit, Input } from '@angular/core';
import { GetImageByCategoryRequest } from 'src/app/shared/dto/food/GetImageByCategoryRequest';
import { GetImageByCategoryResponse } from 'src/app/shared/dto/food/GetImageByCategoryResponse';
import { GetMenuResponse } from 'src/app/shared/dto/menu/GetMenuResponse';
import { Category } from 'src/app/shared/models/Category';
import { FoodViewer } from 'src/app/shared/models/FoodViewer';
import { MenuViewer } from 'src/app/shared/models/MenuViewer';
import { FoodService } from 'src/app/shared/services/food.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { Utils } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-menu-by-category',
  templateUrl: './menu-by-category.component.html',
  styleUrls: ['./menu-by-category.component.css']
})
export class MenuByCategoryComponent implements OnInit {
  @Input() category : Category;

  menuViewer : MenuViewer;
  URLAPI = environment.urlApi;
  images : FoodViewer[] = [];
  showMenu : boolean;
  showGalleryImages : boolean;

  constructor(
      private menuService: MenuService,
      private foodService: FoodService
    ) 
    {
    this.menuViewer = new MenuViewer(null);

   }

  ngOnInit() {
    this.getMenuByCategory();
    this.getImageByCategory();

  }

  getMenuByCategory(){
    this.menuService.getMenuViewerByCategory(this.category.id).subscribe((res: GetMenuResponse) => {
      this.menuViewer = new MenuViewer (res.menuViewer);
      this.showMenu = true;
    })
  }

  getImageByCategory(){
    const request: GetImageByCategoryRequest = {
      idCategory: this.category.id
    }
    this.foodService.getImageByCategory(request).subscribe((res: GetImageByCategoryResponse) => {
      if (res.foodViewer.length > 0){
        this.images = res.foodViewer;
        this.showGalleryImages = true;
      }
    })

  }
  



}
