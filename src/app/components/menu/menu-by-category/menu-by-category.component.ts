import { Component, OnInit, Input } from '@angular/core';
import { GetMenuByCategoryResponse } from 'src/app/shared/dto/menu/GetMenuByCategoryResponse';
import { Category } from 'src/app/shared/models/Category';
import { MenuViewer } from 'src/app/shared/models/MenuViewer';
import { MenuService } from 'src/app/shared/services/menu.service';
import { Utils } from 'src/app/shared/utils';


@Component({
  selector: 'app-menu-by-category',
  templateUrl: './menu-by-category.component.html',
  styleUrls: ['./menu-by-category.component.css']
})
export class MenuByCategoryComponent implements OnInit {
  @Input() category : Category;
  menuViewer : MenuViewer;

  constructor(
      private menuService: MenuService,
    ) 
    {
    this.menuViewer = new MenuViewer(null);
   }

  ngOnInit() {
    this.getMenuByCategory();

  }

  getMenuByCategory(){
    this.menuService.getMenuByCategory(this.category.id).subscribe((res: GetMenuByCategoryResponse) => {
      console.log(res);
      this.menuViewer = new MenuViewer (res.menuViewer);
    })
  }



}
