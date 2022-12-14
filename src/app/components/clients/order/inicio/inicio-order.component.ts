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
import { AddOrderResponse } from 'src/app/shared/dto/order/AddOrderResponse';
import { ActivatedRoute, Router } from '@angular/router';
import  * as ROUTES  from '../../../../shared/routes/index.routes'
import { SelectAddressComponent } from '../select-address/select-address.component';


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
  selectedAdress: Address;
  viewOrderByDay : boolean;
  daysOfMonth : Date [];
  menu : Menu;

  ORDERS: string = ROUTES.INTERNAL_ROUTES.CLIENT +'/'+ ROUTES.INTERNAL_ROUTES.ORDERS;


  public userProfile: KeycloakProfile | null;

  constructor(
    private _formBuilder: FormBuilder, 
    breakpointObserver: BreakpointObserver,
    private categoryService: CategoryService,
    private menuService: MenuService,
    public dialog: MatDialog,
    private orderService: OrderService,
    private clientService : ClientService,
    private readonly keycloak: KeycloakService,
    private router: Router,
    private route: ActivatedRoute,
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
    this.getClientByIdUser();
  }

  async getCategories() {
    await this.categoryService.getCategories().subscribe((res: GetCategoryResponse) => {
      this.categories = res.categories;
    })
  }

  async getClientByIdUser(){
    await this.clientService.getClientByIdUser(this.userProfile?.id!).subscribe((res : GetClientByIdUserResponse) => {
      this.client = new Client(res.client);
      this.selectedAdress = new Address(this.client.addresses.find( address => address.favourite));

    })
  }

  selectCategory(event: Category[]){
    this.selectedCategories = event;
    this.firstStepCompleted = true;
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

  async onGetMenu(){
    let request = new GetMenuByCategoriesRequest(this.selectedCategories);
    await this.menuService.getMenuByCategories(request).subscribe((res: getMenuByCategoriesResponse) => {
      this.menu = res.menu;
      this.generateOrder(res.menu)
    })
  }

  generateOrder(menu : Menu) {
    this.order.daysOrder = [];
    var total = 0;
    var cantMenus = 0;
    this.daysOfMonth = [];

    menu.turns.forEach(turn => {
      turn.days.forEach (dayFood => {
        const dayOrder : DayOrder = {
          id: 0,
          address: new Address (null),
          cant: 1,
          dayFood: new DayFood(dayFood),
          observation: ""
        }
        this.order.daysOrder.push(dayOrder)
        total = (dayOrder.dayFood.category.price * dayOrder.cant) + total;
        cantMenus += cantMenus;

        if (!this.existeFecha(this.daysOfMonth, dayOrder.dayFood.date)){//para evitar duplicados
          this.daysOfMonth.push(new Date(dayFood.date));
        }

      })
      this.order.client = this.client;
      this.order.date = new Date();
      this.order.observation = "";
      this.order.total = total;
    });
  }

  existeFecha(array: any, fecha: Date) {
    return array.some((f: any) => {
      return f.getTime() === fecha.getTime();     
    });
  }

  async sendOrder() {
    var dayOrderRequestArray : DayOrderRequest[] = [];


    this.order.daysOrder.forEach(dayOrder => {
      const dayOrderRequest : DayOrderRequest = {
        cant: dayOrder.cant,
        idAddress: new Address (this.selectedAdress).id,
        idDayFood: dayOrder.dayFood.id,
        observation: dayOrder.observation
      }
      dayOrderRequestArray.push(dayOrderRequest);
    })

    const request: AddOrderRequest = {
      daysOrderRequest: dayOrderRequestArray,
      idClient: this.order.client.id,
      observation: this.order.observation,
      total: this.order.total,
      date: this.order.date
    }
    this.orderService.addOrder(request).subscribe((res: AddOrderResponse) => {
      if (res){
        return false;
      } else {
        this.router.navigateByUrl(this.ORDERS);
      }
    });
  }

  onViewOrderByDay(){
    this.viewOrderByDay = true;

  }

 onStepComplete(steps : any){
  switch(steps) { 
    case 0: { 
      this.onGetMenu();
      break; 
    } 
    case 1: { 
      //this.createOrder()

      this.onViewOrderByDay()
      break; 
    } 
    case 2: { 
      this.sendOrder();
      //this.onGenerateOrder();
      break; 
   } 
    default: { 
       //statements; 
       break; 
    } 
  } 
 }

 onChangeAddress(address : any){
  this.selectedAdress = new Address(address)
 }

 onGetClient(){
  console.log("toy")
  this.getClientByIdUser();
 }



}
