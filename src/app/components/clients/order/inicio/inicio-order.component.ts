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
import { GetMenuByCategoriesRequest } from 'src/app/shared/dto/menu/GetMenuByCategoryRequest';
import { getMenuByCategoriesResponse } from 'src/app/shared/dto/menu/getMenuByCategoriesResponse';
import { OrderService } from 'src/app/shared/services/order.service';
import { AddOrderRequest } from 'src/app/shared/dto/order/AddOrderRequest';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { KeycloakProfile } from 'keycloak-js';
import { DayOrderRequest } from 'src/app/shared/dto/order/DayOrderRequest';
import { Menu } from 'src/app/shared/models/Menu';
import { DayOrder } from 'src/app/shared/models/DayOrder';
import { Address } from 'src/app/shared/models/Address';
import { DayFood } from 'src/app/shared/models/DayFood';
import { ClientService } from 'src/app/shared/services/client.service';
import { KeycloakService } from 'keycloak-angular';
import { GetClientByIdUserResponse } from 'src/app/shared/dto/client/GetClientByIdUserResponse';
import { Client } from 'src/app/shared/models/Client';


@Component({
  selector: 'app-inicio-order',
  templateUrl: './inicio-order.component.html',
  styleUrls: ['./inicio-order.component.css']
})
export class InicioOrderComponent implements OnInit {

  stepperOrientation: Observable<StepperOrientation>;

  categories : Category[] = [];
  selectedCategories : Category[] = [];
  firstStepCompleted: boolean;
  order : Order;
  client : Client;

  public userProfile: KeycloakProfile | null;

  constructor(
    private _formBuilder: FormBuilder, 
    breakpointObserver: BreakpointObserver,
    private categoryService: CategoryService,
    private menuService: MenuService,
    public dialog: MatDialog,
    private orderService: OrderService,
    private clientService : ClientService,
    private readonly keycloak: KeycloakService
    ) 
    {
      this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
      this.order = new Order(null);
      this.order.daysOrder = [];
    }

 async ngOnInit() {
    await this.getCategories();
    this.userProfile = await this.keycloak.loadUserProfile();
    this.getClientByIdUser()

  }

  async getCategories() {
    await this.categoryService.getCategories().subscribe((res: GetCategoryResponse) => {
      this.categories = res.categories;
    })
  }

  selectCategory(event: Category[]){
    this.selectedCategories = event;
    this.firstStepCompleted = true;
  }

  async onGetMenu(){
  let request = new GetMenuByCategoriesRequest(this.selectedCategories);
    await this.menuService.getMenuByCategories(request).subscribe((res: getMenuByCategoriesResponse) => {
      this.generateOrder(res.menu)
    })
  }

  generateOrder(menu : Menu) {
  this.order.daysOrder = [];
      menu.turns.forEach(turn => {
        turn.days.forEach (dayFood => {
          const dayOrder : DayOrder = {
            id: 0,
            address: new Address(null),
            cant: 1,
            dayFood: new DayFood(dayFood),
            observation: ""
          }
          this.order.daysOrder.push(dayOrder)
        })
      });
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


  async createOrder() {
    var dayOrderRequestArray : DayOrderRequest[] = [];
    var favoriteAdress = this.client.addresses.find(({ id }) => id === 1);
    this.order.daysOrder.forEach(dayOrder => {
      const dayOrderRequest : DayOrderRequest = {
        cant: dayOrder.cant,
        idAddress: (new Address (favoriteAdress)).id,
        idDayFood: dayOrder.dayFood.id,
        observation: dayOrder.observation
      }
      dayOrderRequestArray.push(dayOrderRequest);
    })
    const request: AddOrderRequest = {
      daysOrderRequest: dayOrderRequestArray,
      idClient: this.client.id,
      observation: "puto",
      total: 60000,
      date: new Date()
    }
    this.orderService.addOrder(request);
  }

 onStepComplete(steps : any){
  switch(steps) { 
    case 0: { 
      this.onGetMenu();
      break; 
    } 
    case 1: { 
      this.createOrder()
      break; 
    } 
    case 2: { 
      //this.onGenerateOrder();
      break; 
   } 
    default: { 
       //statements; 
       break; 
    } 
  } 
 }
 async getClientByIdUser(){
  await this.clientService.getClientByIdUser(this.userProfile?.id!).subscribe((res : GetClientByIdUserResponse) => {
    this.client = new Client(res.client);
    })
  }

}
