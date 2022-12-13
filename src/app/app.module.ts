import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ViewMenuCompleteComponent } from './components/menu/view-menu-complete/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarrouselComponent } from './components/administration/carrousel/carrousel.component'; 
import { InicioAdminComponent } from './components/administration/inicio-admin/inicio-admin.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './components/administration/sidenav/sidenav.component'; 
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { SpinnerInterceptor } from './shared/interceptors/spinner.interceptor';
import { ServerErrorInterceptor } from './shared/interceptors/server-error.interceptor';
import { GlobalErrorHandler } from './shared/global-error-handler';
import { CarrouselFormComponent } from './components/administration/carrousel-form/carrousel-form.component'; 
import { CategoriesCardsComponent } from './components/categories-cards/categories-cards.component'

//material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';




import { MatConfirmDialogComponent } from './shared/components/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatNotificationComponent } from './shared/components/mat-notification/mat-notification.component';
import { FoodComponent } from './components/administration/food/food.component';
import { FoodFormComponent } from './components/administration/food-form/food-form.component';

import { MenuInicioComponent } from './components/administration/menu/inicio/inicio.component';
import { DayComponent } from './components/administration/menu/day/day.component';
import { CategoriesComponent } from './components/administration/menu/categories/categories.component';
import { CategoryComponent } from './components/administration/category/category.component';
import { CategoryFormComponent } from './components/administration/category-form/category-form.component';
import { EditMenuComponent } from './components/administration/menu/edit-menu/edit-menu.component';
import { ListMenuComponent } from './components/administration/menu/list-menu/list-menu.component';
import { ViewMenuComponent } from './components/administration/menu/view-menu/view-menu.component';
import { MenuByCategoryComponent } from './components/menu/menu-by-category/menu-by-category.component';

import { AuthModule } from './auth/auth.module';
import { CalendarMenuComponent } from './components/administration/menu/calendar-menu/calendar-menu.component';
import { CalendarFoodComponent } from './components/administration/menu/calendar-food/calendar-food.component';

import { GalleryModule } from  'ng-gallery';
import { LightboxModule } from  'ng-gallery/lightbox';
import { GalleryImagesComponent } from './components/gallery-images/gallery-images.component';


import { InicioClientComponent } from './components/clients/inicio-client/inicio-client.component';
import { NavCLientComponent } from './components/clients/nav-client/nav-client.component';
import { ClientFormComponent } from './components/clients/client-form/client-form.component';
import { ProfileComponent } from './components/clients/profile/profile.component';
import { PathologyComponent } from './components/administration/pathology/pathology.component';
import { PathologyFormComponent } from './components/administration/pathology-form/pathology-form.component';
import { InicioOrderComponent } from './components/clients/order/inicio/inicio-order.component';
import { OrderCategoriesComponent } from './components/clients/order/categories/categories.component';
import { OrderListFoodComponent } from './components/clients/order/list-food/list-food.component';
import { ViewDetailsCategoryComponent } from './components/clients/order/view-details-category/view-details-category.component';
import { ResumeOrderComponent } from './components/clients/order/resume-order/resume-order.component'
import { AddressFormComponent } from './components/clients/address-form/address-form.component'
import { FinishOrderComponent } from './components/clients/order/finish-order/finish-order.component';
import { AddressComponent } from './components/clients/address/address.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ViewMenuCompleteComponent,
    FooterComponent,
    HeaderComponent,
    CarrouselComponent,
    InicioAdminComponent,
    SidenavComponent,
    CarrouselFormComponent,
    MatConfirmDialogComponent,
    MatNotificationComponent,
    SpinnerComponent,
    FoodComponent,
    FoodFormComponent,
    MenuInicioComponent,
    DayComponent,
    CategoriesComponent,
    CategoryComponent,
    CategoryFormComponent,
    EditMenuComponent,
    ListMenuComponent,
    ViewMenuCompleteComponent,
    CategoriesCardsComponent,
    MenuByCategoryComponent,
    ViewMenuComponent,
    CalendarMenuComponent,
    CalendarFoodComponent,
    GalleryImagesComponent,
    InicioClientComponent,
    NavCLientComponent,
    ClientFormComponent,
    ProfileComponent,
    PathologyComponent,
    PathologyFormComponent,
    InicioOrderComponent,
    OrderCategoriesComponent,
    OrderListFoodComponent,
    ViewDetailsCategoryComponent,
    ResumeOrderComponent,
    AddressFormComponent,
    FinishOrderComponent,
    AddressComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatGridListModule,
    AuthModule,
    GalleryModule,
    LightboxModule,
    MatChipsModule,
    MatStepperModule,
    CommonModule
  ],
  providers: [
    MatNotificationComponent,
    MatDatepickerModule,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' }

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  

})
export class AppModule { }
