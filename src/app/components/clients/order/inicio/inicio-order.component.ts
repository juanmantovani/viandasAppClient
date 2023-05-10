import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
import * as ROUTES from '../../../../shared/routes/index.routes'
import { DialogService } from 'src/app/shared/services/dialog.service';
import { TurnViewer } from 'src/app/shared/models/TurnViewer';
import { CategoryTable } from 'src/app/shared/models/CategoryTable';
import { GetTotalOrderResponse } from 'src/app/shared/dto/order/GetTotalOrderResponse';
import * as moment from 'moment';


@Component({
  selector: 'app-inicio-order',
  templateUrl: './inicio-order.component.html',
  styleUrls: ['./inicio-order.component.css']
})
export class InicioOrderComponent implements OnInit {

  stepperOrientation: Observable<StepperOrientation>;

  categories: Category[] = [];
  selectedCategories: Category[] = [];
  cantFoodOfCategory: CategoryTable[] = [];
  firstStepCompleted: boolean;
  order: Order;
  range: FormGroup;
  minDate: Date;
  menuViewer: MenuViewer;
  existDayFood: boolean;

  client: Client;
  selectedAdress: Address;
  viewOrderByDay: boolean;
  disableNextButton: boolean = true;
  disableBackButton: boolean = true;
  finishButton: boolean;
  personalizeOrder: boolean;
  cant: number = 1;

  daysOfMonth: Date[];
  menu: Menu;

  ORDERS: string = ROUTES.INTERNAL_ROUTES.CLIENT + '/' + ROUTES.INTERNAL_ROUTES.ORDERS;
  textWhatsAppShow: string;
  textWhatsAppSend: string;


  public userProfile: KeycloakProfile | null;

  orderInProgress: boolean = true;
  orderSuccess: boolean;

  constructor(
    breakpointObserver: BreakpointObserver,
    private categoryService: CategoryService,
    private menuService: MenuService,
    public dialog: MatDialog,
    private orderService: OrderService,
    private clientService: ClientService,
    private readonly keycloak: KeycloakService,
    private dialogService: DialogService
  ) {
    this.range = this.generateFormWeeks();
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    this.order = new Order(null);
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);

    this.order.daysOrder = [];
  }

  generateFormWeeks(): FormGroup {
    return new FormGroup({
      start: new FormControl(null, [this.requiredValidator, this.dateValidator]),
      end: new FormControl(null, [this.requiredValidator, this.dateValidator]),
    });
  }

  async ngOnInit() {
    await this.getCategories();
    this.userProfile = await this.keycloak.loadUserProfile();
    this.getClientByIdUser();
  }

  dateValidator(formControl: any) {
    const value = formControl.value;
    if (value && (new Date() >= new Date(value)))
      return {
        mensaje: "Debe ingresar una fecha válida"
      }
    return null;
  }

  requiredValidator(formControl: any) {
    const value = formControl.value;
    if (Validators.required(formControl))
      return { mensaje: "Este campo es requerido" };
    return null;
  }

  async getCategories() {
    await this.categoryService.getCategories().subscribe((res: GetCategoryResponse) => {
      this.categories = res.categories;
      this.categories.forEach(cat => {
        this.cantFoodOfCategory.push({
          category: cat,
          cant: 1,
        })
      })
    })
  }

  onDateChange(event: any) {
    this.disableNextButton = event.target.valid;//ver xq no anda
    this.firstStepCompleted = true;

  }

  async getClientByIdUser() {
    await this.clientService.getClientByIdUser(this.userProfile?.id!).subscribe((res: GetClientByIdUserResponse) => {
      this.client = new Client(res.client);
      this.selectedAdress = new Address(this.client.addresses.find(address => address.favourite));
    })
  }

  selectCategory(event: Category[]) {
    this.personalizeOrder = false;
    this.selectedCategories = event;
    this.disableNextButton = this.selectedCategories.length < 1 ? true : false;
  }

  selectPersonalize(event: Category[]) {
    this.selectedCategories = event;
    this.disableNextButton = this.selectedCategories.length < 1 ? true : false;
    this.personalizeOrder = true
  }

  async onViewDetailsCategory(category: Category) {
    var menuViewerByCategory = new MenuViewer(this.menuViewer);
    menuViewerByCategory.turnsViewer.forEach((turn: TurnViewer, index: number) => {
      turn.categoryViewer = this.menuViewer.turnsViewer[index].categoryViewer.filter(c => c.category.id == category.id)
    })

    this.showDetailsCategory(menuViewerByCategory)
  }

  onSetCant(cant: CategoryTable[]) {
    this.cantFoodOfCategory = cant;
  }

  async onViewDetailsPersonalize(event: boolean) {
    this.showDetailsCategory(this.menuViewer)
  }

  async getMenuViewer() {
    this.existDayFood = false;
    var request: GetMenuByCategoriesRequest = {
      idCategory: this.categories,
      dateStart: this.range.getRawValue().start,
      dateEnd: this.range.getRawValue().end
    }
    await this.menuService.getMenuViewer(request).subscribe((res: GetMenuResponse) => {
      if (res) {
        this.menuViewer = Utils.orderMenuViewerByTurn(new MenuViewer(res.menuViewer));
      } 
      if(this.menuViewer.turnsViewer?.length > 0) {
        this.existDayFood = true;
      }else {
        this.existDayFood = false;
      }

    })
  }


  showDetailsCategory(menuViewer: MenuViewer) {
    const dialogConfig = Utils.matDialogConfigMenu();
    dialogConfig.data = menuViewer;
    dialogConfig.maxHeight = '95%';
    dialogConfig.maxWidth = '95%';
    const dialogRef = this.dialog.open(ViewDetailsCategoryComponent, dialogConfig);
  }

  async onGetMenu() {
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

  generateOrder(menu: Menu) {
    this.order.daysOrder = [];
    var total = 0;
    //var cantMenus = 0;
    this.daysOfMonth = [];

    menu.turns.forEach(turn => {
      turn.days.forEach(dayFood => {
        const dayOrder: DayOrder = {
          id: 0,
          address: new Address(this.selectedAdress),
          cant: this.personalizeOrder ? 0 : this.getCant(dayFood.category.id),
          dayFood: new DayFood(dayFood),
          observation: "",
          status : true
        }
        this.order.daysOrder.push(dayOrder)
        //total = (dayOrder.dayFood.category.price * dayOrder.cant) + total;
        //cantMenus += cantMenus;

        if (!this.existeFecha(this.daysOfMonth, dayOrder.dayFood.date)) {//para evitar duplicados
          this.daysOfMonth.push(new Date(dayFood.date));
        }

      })
      this.order.client = this.client;
      this.order.date = new Date();
      this.order.observation = "";
      //this.order.total = total;
    });

  }

  getCant(categoryId: number): number {
    var cant = 0;
    this.cantFoodOfCategory.forEach(c => {
      if (c.category.id === categoryId)
        cant = c.cant
    })
    return cant
  }

  existeFecha(array: any, fecha: Date) {
    return array.some((f: any) => {
      return f.getTime() === fecha.getTime();
    });
  }

  async sendOrder() {

    if (await this.generateConfirm("Está a punto de realizar una order. ¿Está seguro de realizar esta operación?") === true) {

      var request = this.generateRequest();

      this.orderService.addOrder(request).subscribe((res: AddOrderResponse) => {
        if (res) {
          this.orderInProgress = false;
          this.orderSuccess = true;
          this.textWhatsAppShow = this.formatOrder(res.idOrder)
        } else {
          return false;
        }
      });
    }
  }

  formatOrder(idOrder : number): string {
    let result = '';
    result += `Hola, mi nombre es ${this.order.client.name} ${this.order.client.lastName} y realicé el pedido N ${idOrder}\n`;

    this.order.daysOrder.forEach(dayOrder => {
      const { cant, dayFood: { category: { title, price } } } = dayOrder;
      result += `${cant} ${title} ${price}\n`;
    });


    // this.order.daysOrder.forEach(dayOrder => {
    //   if(dayOrder.cant > 0) {
    //     const dayFood = dayOrder.dayFood;
    //     const categoryTitle = dayFood.category.title;
    //     const day = moment(dayFood.date).format('DD/MM');
    //     const foodTitle = dayFood.food.title;
    //     const cant = dayOrder.cant;
        
    //     result += `${day} (${cant}x${categoryTitle}) - ${foodTitle} \n`;
    //   }
    // });
    
    result += '-----------------------------------\n';
    result += `Total: ${this.order.total}\n`;
    
    this.textWhatsAppSend = result.replace(/[\n]/g, "%0a")

    return result;
  }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  onViewOrderByDay() {
    this.viewOrderByDay = true;
  }
  onGetTotal() {
    this.finishButton = true;
    this.disableNextButton = true;

    var request = this.generateRequest();
    this.orderService.getTotal(request).subscribe((res: GetTotalOrderResponse) => {
      if (res) {
        this.order.total = res.total;
        this.order.discount = res.discount
        this.order.delivery = res.delivery
        this.order.subTotal = res.subTotal
        this.disableNextButton = false;
      } else {
        // quizás hacer algo
      }
    });

  }

  onClickBack(steps: any) {
    this.disableBackButton = steps <= 1 ? true : false;
    this.finishButton = false;
  }

  onStepComplete(steps: any) {
    switch (steps) {
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
        this.onGetTotal();
        break;
      }
      case 4: {
        this.sendOrder();
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  onChangeAddress(address: any) {

    this.order.daysOrder.forEach(dayOrder => {
      dayOrder.address = address;
    })

    this.selectedAdress = new Address(address)
  }

  onGetClient() {
    this.getClientByIdUser();
  }


  private generateRequest() {
    var dayOrderRequestArray: DayOrderRequest[] = [];

    this.order.daysOrder.forEach(dayOrder => {
      const dayOrderRequest: DayOrderRequest = {
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

    return request;
  }



}
