import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarrouselComponent } from './components/administration/carrousel/carrousel.component'; 
import { InicioAdminComponent } from './components/administration/inicio-admin/inicio-admin.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './components/administration/sidenav/sidenav.component'; 
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { SpinnerInterceptor } from './shared/interceptors/spinner.interceptor';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ServerErrorInterceptor } from './shared/interceptors/server-error.interceptor';
import { GlobalErrorHandler } from './shared/global-error-handler';

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
import { CarrouselFormComponent } from './components/administration/carrousel-form/carrousel-form.component'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';





import { MatConfirmDialogComponent } from './shared/components/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatNotificationComponent } from './shared/components/mat-notification/mat-notification.component';
import { RegisterComponent } from './components/register/register.component';
import { FoodComponent } from './components/administration/food/food.component';
import { FoodFormComponent } from './components/administration/food-form/food-form.component';

import { MenuInicioComponent } from './components/administration/menu/inicio/inicio.component';
import { WeekComponent } from './components/administration/menu/week/week.component';
import { DayComponent } from './components/administration/menu/day/day.component';
import { CategoriesComponent } from './components/administration/menu/categories/categories.component'

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    CarrouselComponent,
    InicioAdminComponent,
    SidenavComponent,
    CarrouselFormComponent,
    MatConfirmDialogComponent,
    MatNotificationComponent,
    SpinnerComponent,
    RegisterComponent,
    FoodComponent,
    FoodFormComponent,
    MenuInicioComponent,
    WeekComponent,
    DayComponent,
    CategoriesComponent
    
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
    MatAutocompleteModule

  ],
  providers: [
    MatNotificationComponent,
    MatDatepickerModule,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
