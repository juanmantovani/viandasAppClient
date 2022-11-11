import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditMenuRequest } from 'src/app/shared/dto/menu/EditMenuRequest';
import { Utils } from 'src/app/utils';
import { EditMenuComponent } from '../edit-menu/edit-menu.component';
import { MenuService } from 'src/app/shared/services/menu.service';
import { EditMenuResponse } from 'src/app/shared/dto/menu/EditMenuResponse';
import { ValidateDateMenuRequest } from 'src/app/shared/dto/menu/ValidateDateMenuRequest';
import { ValidateDateMenuResponse } from 'src/app/shared/dto/menu/ValidateDateMenuResponse';
import { MatTableDataSource } from '@angular/material/table';
import { MenuList } from 'src/app/shared/models/MenuList';
import { DeleteMenuRequest } from 'src/app/shared/dto/menu/DeleteMenuRequest';
import { GetMenuResponse } from 'src/app/shared/dto/menu/GetMenuResponse';
import { MenuViewer } from 'src/app/shared/models/MenuViewer';
import { ViewMenuComponent } from '../view-menu/view-menu.component';
import { GetAllMenuResponse } from 'src/app/shared/dto/menu/GetAllMenuResponse';
import { defineFullCalendarElement,  } from '@fullcalendar/web-component';
import { CalendarOptions } from '@fullcalendar/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import { EventInput } from '@fullcalendar/web-component';
import { Observable } from 'rxjs';



defineFullCalendarElement();

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class MenuInicioComponent implements OnInit {
  range: FormGroup;
  dateStart: Date;
  dateEnd: Date;
  viewCategories: boolean;
  chargeMenu: boolean;
  listMenu: boolean;
  dataSource!: MatTableDataSource<MenuList>;
  menuViewer : MenuViewer;
  viewCalendarFood: boolean;

  eventsMenu: any[] = [];
  eventsFood: any[] = [];

  daysOfMonth : any[]
  WEEKDAY = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  validDateMenu  : Boolean = true;
  
  constructor(public dialog: MatDialog, private menuService : MenuService) { 
    this.range = this.generateFormWeeks();
    this.dataSource = new MatTableDataSource<MenuList>();
    this.listMenu = true;

    this.getMenus();
  }

  ngOnInit(): void {

  }

  generateFormWeeks(): FormGroup {
    return new FormGroup({
      start: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required),
    });
  }

  async onClickWeeks() {
    this.daysOfMonth = [];
    this.viewCategories = false;
    this.dateStart = this.range.getRawValue().start;
    this.dateEnd = this.range.getRawValue().end;

    const request: ValidateDateMenuRequest = {
      dateStart : this.dateStart,
      dateEnd : this.dateEnd
    }
    await this.menuService.validateDateMenu(request).subscribe((res: ValidateDateMenuResponse) => {
      this.validDateMenu  =  res.validDateMenu;
      if(this.validDateMenu){
        this.setDaysOfMonth()
        this.viewCategories = true;
      }
    })
  }

   setDaysOfMonth(){
    let dateStartAux = new Date(this.dateStart);
    let dateEndAux = new Date(this.dateEnd);
    const CANTDAYS = (dateEndAux?.getTime() - dateStartAux?.getTime())/(1000*60*60*24)+1;
    let currentDate = new Date(dateStartAux);
    let currentDay : string;
    for(let i = 0; i < CANTDAYS; i++){
      currentDay = this.WEEKDAY[dateStartAux.getDay()];
      if (currentDay != 'Sábado' && currentDay != 'Domingo'){     
        const ITEM = ({
          date: currentDate, 
          day: currentDay 
        })
        this.daysOfMonth.push(ITEM);
    }
      currentDate = new Date(dateStartAux.setDate(dateStartAux.getDate() + 1));
    }
  }

  onClickEdit(){
    const dialogConfig = Utils.matDialogConfigMenu();
    const dialogRef = this.dialog.open(EditMenuComponent, dialogConfig);
    const componentInstance = dialogRef.componentInstance;

    componentInstance.onSubmit.subscribe(async (data) => {
      if (!data) {
        dialogRef.close();
        return false;
      }

      var result : any  = await this.onSubmitEdit(data);
      if (result) {
        return false;
      }
      else {
        dialogRef.close();
        return true;
      }
    })
  }

  async onSubmitEdit(editMenuRequest: EditMenuRequest){ 
    await this.menuService.editMenu(editMenuRequest).subscribe((res: EditMenuResponse) => {
      return res;
    })
  }

  async getMenus(){
    await this.menuService.getAllMenus().subscribe((res: GetAllMenuResponse) => {
      this.dataSource = new MatTableDataSource(res.menuList);
    })
  }

 async completeCalendarFood(){
    await this.dataSource.filteredData?.forEach(menuList => {
      //let menuViewer = await new MenuViewer(this.getMenuByID(menuList.menuId));
      this.menuService.getMenuByID(menuList.menuId).subscribe((res: GetMenuResponse) => {
        let menuViewer = new MenuViewer(res.menuViewer);
        menuViewer.turnsViewer?.forEach(turnsViewer => {
          turnsViewer.categoryViewer?.forEach(categoryViewer => {
            categoryViewer.daysViewer?.forEach(dayViewer => {
              let food = {
                title: categoryViewer.category.title+' - ' + dayViewer.foodViewer.title,
                idMenu: menuViewer.id,
                start: new Date(dayViewer.date),
                allDay: true,
                //end: new Date((dayViewer.date).setHours(23, 59, 59)),
                backgroundColor: this.getColorByCategory(categoryViewer.category.id),
                category: categoryViewer.category.title,
                foodTitle: dayViewer.foodViewer.title
              }
              this.eventsFood.push(food);
            })
          })
        })
      })
    })
  }

  //  async getMenuByID(menuId: number) : Promise<any> {
  //   this.menuService.getMenuByID(menuId).subscribe((res: GetMenuResponse) => {
  //     return res.menuViewer;
  //   })
  //}

  generateRandomColor() : string {
    const RANDOMCOLOR : string = Math.floor(Math.random()*16777215).toString(16);
    return '#'+RANDOMCOLOR;
  }

  getColorByCategory(categoryId : number) {
    return this.generateRandomColor();
  }

  onClickAdd() {
    this.completeCalendarMenu();
    this.chargeMenu = true;
    this.listMenu = false;
  }

  completeCalendarMenu(){
    this.eventsMenu = [];
    this.dataSource.filteredData.forEach(m => {
      let menu = {
        title: 'ID Menú: ' + m.menuId,
        idMenu: m.menuId,
        start: m.dateStart,
        end: new Date((m.dateEnd).setHours(23, 59, 59)),
        color: this.generateRandomColor()
      }
    this.eventsMenu.push(menu);
  })
  }

  onClickListAllMenus(){
    this.daysOfMonth = [];
    this.validDateMenu = true;
    this.chargeMenu = false;
    this.listMenu = true;
    this.viewCategories = false;
    this.getMenus();
  }

  async deleteMenu(menuList: MenuList) {
    const request: DeleteMenuRequest = {
      idMenu: menuList.menuId,
      idTurn: menuList.turn.id
    }
    await this.menuService.deleteMenu(request).subscribe(() => {
    this.getMenus();
    } );
  }



  showMenu(menuViewer: MenuViewer) {
    const dialogConfig = Utils.matDialogConfigMenu();
    dialogConfig.data = menuViewer;
    const dialogRef = this.dialog.open(ViewMenuComponent, dialogConfig);
  }
   
  redirectToList(event: boolean){
    this.onClickListAllMenus();
  }

  async onViewMenu(menuId : number){
    let type = menuId.valueOf();
    await this.menuService.getMenuByID(menuId).subscribe((res: GetMenuResponse) => {
      this.showMenu(new MenuViewer(res.menuViewer))
    })
  }

 async onClickCalendar() {
    await this.completeCalendarFood();
    this.viewCalendarFood = true;
  }


}
