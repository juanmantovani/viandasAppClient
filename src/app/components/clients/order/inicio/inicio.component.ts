import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Category } from 'src/app/shared/models/Category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { GetCategoryResponse } from 'src/app/shared/dto/category/GetCategoryResponse';
import { MenuService } from 'src/app/shared/services/menu.service';
import { GetMenuResponse } from 'src/app/shared/dto/menu/GetMenuResponse';
import { Order } from 'src/app/shared/models/Order';
import { Utils } from 'src/app/utils';
import { MenuViewer } from 'src/app/shared/models/MenuViewer';
import { MatDialog } from '@angular/material/dialog';
import { ViewDetailsCategoryComponent } from '../view-details-category/view-details-category.component';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class OrderInicioComponent implements OnInit {

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  categories : Category[] = [];
  selectedCategory : Category;
  firstStepCompleted: boolean;
  order : Order;


  constructor(
    private _formBuilder: FormBuilder, 
    breakpointObserver: BreakpointObserver,
    private categoryService: CategoryService,
    private menuService: MenuService,
    public dialog: MatDialog
    ) 
    {
      this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
    }

 async ngOnInit() {
    await this.getCategories();
  }

  async getCategories() {
    await this.categoryService.getCategories().subscribe((res: GetCategoryResponse) => {
      this.categories = res.categories;
    })
  }

  selectCategory(event: Category){
    this.selectedCategory = event;
    this.firstStepCompleted = true;
  }

  async nextStep(){

    let sdf = {
      "dateStart": '2022-11-19T03:00:00.000Z',
      "dateEnd": "2022-11-29T03:00:00.000Z",
      "id": 2,
      "turnsViewer": [
          {
              "id": 1,
              "description": "Mediodia",
              "categoryViewer": [
                  {
                      "category": {
                          "id": 2,
                          "title": "General",
                          "description": "NO se ",
                          "price": 700,
                          "checked": false,
                          "urlImage": "/public/category/b4391c4d8e242221b1533de106d1c93c.PNG",
                          "color": "#CF8266"
                      },
                      "days": [
                          {
                            "category": {
                            "id": 2,
                            "title": "General",
                            "description": "NO se ",
                            "price": 700,
                            "checked": false,
                            "urlImage": "/public/category/b4391c4d8e242221b1533de106d1c93c.PNG",
                            "color": "#CF8266"
                        },
                              "food": {
                                  "id": 1,
                                  "title": "Milanesa de pez con ensalada",
                                  "description": "Mila de pescado de mar con ensalada de tomates cherry, pera, roquefort y semillas de 5 especies con ensalada de tomates cherry, pera, roquefort y semillas de 5 especies",
                                  "urlImage": "/public/food/790e98ce592bb831edf6077c22b0e909.jpg"
                              },
                              "date": "2022-11-21T03:00:00.000Z"
                          },
                          {
                            "category": {
                              "id": 2,
                              "title": "General",
                              "description": "NO se ",
                              "price": 700,
                              "checked": false,
                              "urlImage": "/public/category/b4391c4d8e242221b1533de106d1c93c.PNG",
                              "color": "#CF8266"
                          },
                              "food": {
                                  "id": 2,
                                  "title": "Tomates rellenos",
                                  "description": "Con arroz y cositas",
                                  "urlImage": "/public/food/a9bf52f25d382836e3bfd230f9bf8383.jpg"
                              },
                              "date": "2022-11-22T03:00:00.000Z"
                          },
                          {
                            "category": {
                              "id": 2,
                              "title": "General",
                              "description": "NO se ",
                              "price": 700,
                              "checked": false,
                              "urlImage": "/public/category/b4391c4d8e242221b1533de106d1c93c.PNG",
                              "color": "#CF8266"
                          },
                              "food": {
                                  "id": 4,
                                  "title": "Fideos con cosas",
                                  "description": "",
                                  "urlImage": "/public/food/1b4ad061d0429edcf76303ed544ea212.jpg"
                              },
                              "date": "2022-11-23T03:00:00.000Z"
                          },
                          {
                            "category": {
                              "id": 2,
                              "title": "General",
                              "description": "NO se ",
                              "price": 700,
                              "checked": false,
                              "urlImage": "/public/category/b4391c4d8e242221b1533de106d1c93c.PNG",
                              "color": "#CF8266"
                          },
                              "food": {
                                  "id": 6,
                                  "title": "Tortilla con fideos",
                                  "description": "De espinaca",
                                  "urlImage": "/public/food/5a2fe6f1bc161c43009b7c1f56f6c04d.jpg"
                              },
                              "date": "2022-11-24T03:00:00.000Z"
                          },
                          {
                            "category": {
                              "id": 2,
                              "title": "General",
                              "description": "NO se ",
                              "price": 700,
                              "checked": false,
                              "urlImage": "/public/category/b4391c4d8e242221b1533de106d1c93c.PNG",
                              "color": "#CF8266"
                          },
                              "food": {
                                  "id": 2,
                                  "title": "Tomates rellenos",
                                  "description": "Con arroz y cositas",
                                  "urlImage": "/public/food/a9bf52f25d382836e3bfd230f9bf8383.jpg"
                              },
                              "date": "2022-11-25T03:00:00.000Z"
                          },
                          {
                            "category": {
                              "id": 2,
                              "title": "General",
                              "description": "NO se ",
                              "price": 700,
                              "checked": false,
                              "urlImage": "/public/category/b4391c4d8e242221b1533de106d1c93c.PNG",
                              "color": "#CF8266"
                          },
                              "food": {
                                  "id": 1,
                                  "title": "Milanesa",
                                  "description": "Con puré",
                                  "urlImage": "/public/food/790e98ce592bb831edf6077c22b0e909.jpg"
                              },
                              "date": "2022-11-28T03:00:00.000Z"
                          },
                          {
                            "category": {
                              "id": 2,
                              "title": "General",
                              "description": "NO se ",
                              "price": 700,
                              "checked": false,
                              "urlImage": "/public/category/b4391c4d8e242221b1533de106d1c93c.PNG",
                              "color": "#CF8266"
                          },
                              "food": {
                                  "id": 4,
                                  "title": "Fideos con cosas",
                                  "description": "",
                                  "urlImage": "/public/food/1b4ad061d0429edcf76303ed544ea212.jpg"
                              },
                              "date": "2022-11-29T03:00:00.000Z"
                          },
                          {
                            "category": {
                            "id": 2,
                            "title": "General",
                            "description": "NO se ",
                            "price": 700,
                            "checked": false,
                            "urlImage": "/public/category/b4391c4d8e242221b1533de106d1c93c.PNG",
                            "color": "#CF8266"
                        },
                              "food": {
                                  "id": 1,
                                  "title": "Milanesa de pez con ensalada",
                                  "description": "Mila de pescado de mar con ensalada de tomates cherry, pera, roquefort y semillas de 5 especies",
                                  "urlImage": "/public/food/790e98ce592bb831edf6077c22b0e909.jpg"
                              },
                              "date": "2022-11-21T03:00:00.000Z"
                          },
                          {
                            "category": {
                              "id": 2,
                              "title": "General",
                              "description": "NO se ",
                              "price": 700,
                              "checked": false,
                              "urlImage": "/public/category/b4391c4d8e242221b1533de106d1c93c.PNG",
                              "color": "#CF8266"
                          },
                              "food": {
                                  "id": 2,
                                  "title": "Tomates rellenos",
                                  "description": "Con arroz y cositas",
                                  "urlImage": "/public/food/a9bf52f25d382836e3bfd230f9bf8383.jpg"
                              },
                              "date": "2022-11-22T03:00:00.000Z"
                          },
                          {
                            "category": {
                              "id": 2,
                              "title": "General",
                              "description": "NO se ",
                              "price": 700,
                              "checked": false,
                              "urlImage": "/public/category/b4391c4d8e242221b1533de106d1c93c.PNG",
                              "color": "#CF8266"
                          },
                              "food": {
                                  "id": 4,
                                  "title": "Fideos con cosas",
                                  "description": "",
                                  "urlImage": "/public/food/1b4ad061d0429edcf76303ed544ea212.jpg"
                              },
                              "date": "2022-11-23T03:00:00.000Z"
                          },
                          {
                            "category": {
                              "id": 2,
                              "title": "General",
                              "description": "NO se ",
                              "price": 700,
                              "checked": false,
                              "urlImage": "/public/category/b4391c4d8e242221b1533de106d1c93c.PNG",
                              "color": "#CF8266"
                          },
                              "food": {
                                  "id": 6,
                                  "title": "Tortilla con fideos",
                                  "description": "De espinaca",
                                  "urlImage": "/public/food/5a2fe6f1bc161c43009b7c1f56f6c04d.jpg"
                              },
                              "date": "2022-11-24T03:00:00.000Z"
                          },
                          {
                            "category": {
                              "id": 2,
                              "title": "General",
                              "description": "NO se ",
                              "price": 700,
                              "checked": false,
                              "urlImage": "/public/category/b4391c4d8e242221b1533de106d1c93c.PNG",
                              "color": "#CF8266"
                          },
                              "food": {
                                  "id": 2,
                                  "title": "Tomates rellenos",
                                  "description": "Con arroz y cositas",
                                  "urlImage": "/public/food/a9bf52f25d382836e3bfd230f9bf8383.jpg"
                              },
                              "date": "2022-11-25T03:00:00.000Z"
                          },
                          {
                            "category": {
                              "id": 2,
                              "title": "General",
                              "description": "NO se ",
                              "price": 700,
                              "checked": false,
                              "urlImage": "/public/category/b4391c4d8e242221b1533de106d1c93c.PNG",
                              "color": "#CF8266"
                          },
                              "food": {
                                  "id": 1,
                                  "title": "Milanesa",
                                  "description": "Con puré",
                                  "urlImage": "/public/food/790e98ce592bb831edf6077c22b0e909.jpg"
                              },
                              "date": "2022-11-28T03:00:00.000Z"
                          },
                          {
                            "category": {
                              "id": 2,
                              "title": "General",
                              "description": "NO se ",
                              "price": 700,
                              "checked": false,
                              "urlImage": "/public/category/b4391c4d8e242221b1533de106d1c93c.PNG",
                              "color": "#CF8266"
                          },
                              "food": {
                                  "id": 4,
                                  "title": "Fideos con cosas",
                                  "description": "",
                                  "urlImage": "/public/food/1b4ad061d0429edcf76303ed544ea212.jpg"
                              },
                              "date": "2022-11-29T03:00:00.000Z"
                          }
                      ]
                  }
              ]
          }
      ]
  }
  this.order = new Order(sdf.turnsViewer[0].categoryViewer[0])
  console.log(this.order)
    // await this.menuService.getMenuByCategory(this.selectedCategory.id).subscribe((res: GetMenuResponse) => {
    //   console.log(res);
    //   this.order = new Order(res.menuViewer.turnsViewer[0].categoryViewer[0]);
    //   console.log(this.order)
    // })

  }

  async onViewDetailsCategory(category: Category){
    await this.menuService.getMenuByCategory(category.id).subscribe((res: GetMenuResponse) => {
      this.showDetailsCategory(new MenuViewer(res.menuViewer))
    })
  }


  showDetailsCategory(menuViewer: MenuViewer) {
    const dialogConfig = Utils.matDialogConfigMenu();
    dialogConfig.data = menuViewer;
    dialogConfig.maxHeight = '95%';
    dialogConfig.maxWidth = '95%';

    const dialogRef = this.dialog.open(ViewDetailsCategoryComponent, dialogConfig);
  }


}
