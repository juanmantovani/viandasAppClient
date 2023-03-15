import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Category } from 'src/app/shared/models/Category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { GetCategoryResponse } from 'src/app/shared/dto/category/GetCategoryResponse';
import { MenuService } from 'src/app/shared/services/menu.service';
import { GetMenuResponse } from 'src/app/shared/dto/menu/getMenuResponse';
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
import { DialogService } from 'src/app/shared/services/dialog.service';
import { GetMenuViewerByRangeOfDateRequest } from 'src/app/shared/dto/menu/GetMenuViewerByRangeOfDateRequest';
import { TurnViewer } from 'src/app/shared/models/TurnViewer';


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
  range: FormGroup;
  minDate : Date;
  menuViewer : MenuViewer;


  client : Client;
  selectedAdress: Address;
  viewOrderByDay : boolean;
  disableNextButton: boolean = true;
  disableBackButton: boolean = true;
  finishButton: boolean;
  personalizeOrder: boolean;
  cant: number = 1;

  daysOfMonth : Date [];
  menu : Menu;

  ORDERS: string = ROUTES.INTERNAL_ROUTES.CLIENT +'/'+ ROUTES.INTERNAL_ROUTES.ORDERS;
  textWhatsApp: string;

  public userProfile: KeycloakProfile | null;

  orderInProgress : boolean = true;
  orderSuccess : boolean;

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
    private dialogService: DialogService
    ) 
    {
      this.range = this.generateFormWeeks();
      this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
      this.order = new Order(null);
      this.minDate = new Date();
      this.order.daysOrder = [];
    }

    generateFormWeeks(): FormGroup {
      return new FormGroup({
        start: new FormControl(null, Validators.required),
        end: new FormControl(null, Validators.required),
      });
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

  onDateChange(event : any){
    this.disableNextButton = event.target.valid;//ver xq no anda
    this.firstStepCompleted = true;

  }

  async getClientByIdUser(){
    await this.clientService.getClientByIdUser(this.userProfile?.id!).subscribe((res : GetClientByIdUserResponse) => {
      this.client = new Client(res.client);
      this.selectedAdress = new Address(this.client.addresses.find( address => address.favourite));
    })
  }

  selectCategory(event: Category[]){
    this.selectedCategories = event;
    this.disableNextButton = this.selectedCategories.length < 1 ? true : false;
  }

  selectPersonalize(event: Category[]) {
    this.selectCategory(event);
    this.personalizeOrder = true
  }

  async onViewDetailsCategory(category: Category){
    var menuViewerByCategory = new MenuViewer(this.menuViewer);
    menuViewerByCategory.turnsViewer.forEach((turn: TurnViewer, index:number) => {
      turn.categoryViewer = this.menuViewer.turnsViewer[index].categoryViewer.filter(c => c.category.id == category.id)
    })
    
    this.showDetailsCategory(menuViewerByCategory)
  }

  onSetCant(cant : number) {
    this.cant = cant;
  }

  async onViewDetailsPersonalize(event: boolean){
    this.showDetailsCategory(this.menuViewer)
  }

  async getMenuViewer(){
    var request : GetMenuByCategoriesRequest = {
      idCategory: this.categories,
      dateStart: this.range.getRawValue().start,
      dateEnd: this.range.getRawValue().end
    }
  await this.menuService.getMenuViewer(request).subscribe((res: GetMenuResponse) => {
   this.menuViewer = new MenuViewer(res.menuViewer)
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
    var request = {
      idCategory: this.selectedCategories,
      dateStart: this.range.getRawValue().start,
      dateEnd: this.range.getRawValue().end
    };
    var getMenuByCategoriesRequest = new GetMenuByCategoriesRequest(request)
    await this.menuService.getMenuByCategories(getMenuByCategoriesRequest).subscribe((res: getMenuByCategoriesResponse) => {
      this.menu = res.menu;
      this.generateOrder(res.menu)
    })
  }

  generateOrder(menu : Menu) {
    this.order.daysOrder = [];
    var total = 0;
    //var cantMenus = 0;
    this.daysOfMonth = [];

    menu.turns.forEach(turn => {
      turn.days.forEach (dayFood => {
        const dayOrder : DayOrder = {
          id: 0,
          address: new Address (this.selectedAdress),
          cant: this.personalizeOrder ? 0 : this.cant,
          dayFood: new DayFood(dayFood),
          observation: ""
        }
        this.order.daysOrder.push(dayOrder)
        total = (dayOrder.dayFood.category.price * dayOrder.cant) + total;
        //cantMenus += cantMenus;

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

    if (await this.generateConfirm("Está a punto de realizar una order. ¿Está seguro de realizar esta operación?") === true)
      {
    var dayOrderRequestArray : DayOrderRequest[] = [];

    this.order.daysOrder.forEach(dayOrder => {
      const dayOrderRequest : DayOrderRequest = {
        cant: dayOrder.cant,
        idAddress: dayOrder.address.id,
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
        this.orderInProgress = false;
        this.orderSuccess = true;
        this.textWhatsApp = 'Hola, ' + 'mi nombre es ' + this.client.name + ' ' + this.client.lastName + ' y realicé el pedido #' + res.idOrder + ' por el total de $' + this.order.total;

      } else {
        return false;
      }
    });
    }
  }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  // onClicSendWhatsApp() {
  //   this.router.navigateByUrl(this.ORDERS);
  // }

  onViewOrderByDay(){
    this.viewOrderByDay = true;
    this.finishButton = true;
    if (this.order.total == 0){
      this.disableNextButton = true;
      this.finishButton = false;
    }
  }

  onClickBack(steps : any){
    this.disableBackButton = steps <= 1 ? true : false;
    this.finishButton = false;

  }

 onStepComplete(steps : any){
  switch(steps) { 
    case 0: { 
      this.disableBackButton = false;
      this.disableNextButton = true;
      this.getMenuViewer();
      break; 
    } 
    case 1: { 
      //this.disableBackButton = false;
      this.onGetMenu();
      break; 
    } 
    case 2: { 
      this.onViewOrderByDay()
      //this.onGenerateOrder();
      break; 
   } 
    case 3: { 
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
  
  this.order.daysOrder.forEach(dayOrder => {
      dayOrder.address = address;
    })

  this.selectedAdress = new Address(address)
 }

 onGetClient(){
  this.getClientByIdUser();
 }



}
