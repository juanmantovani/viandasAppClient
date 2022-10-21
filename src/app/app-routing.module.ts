import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrouselComponent } from './components/administration/carrousel/carrousel.component';
import { InicioAdminComponent } from './components/administration/inicio-admin/inicio-admin.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/services/auth.guard';
import { NoAuthGuard } from './shared/services/no-auth.guard';
import  * as ROUTES  from './shared/routes/index.routes'
import { RegisterComponent } from './components/register/register.component';
import { FoodComponent } from './components/administration/food/food.component';
import { MenuInicioComponent } from './components/administration/menu/inicio/inicio.component';
import { CategoryComponent } from './components/administration/category/category.component';
import { MenuByCategoryComponent } from './components/menu/menu-by-category/menu-by-category.component';


const routes: Routes = [
  {path: '', redirectTo: ROUTES.INTERNAL_ROUTES.INICIO, pathMatch: 'full' },
  
  {
    path: ROUTES.INTERNAL_ROUTES.LOGIN, 
    component: LoginComponent,
    canActivate: [ NoAuthGuard ]
  },

  {
    path: ROUTES.INTERNAL_ROUTES.REGISTER, 
    component: RegisterComponent,
    canActivate: [ NoAuthGuard ]
  },

  { path: ROUTES.INTERNAL_ROUTES.INICIO, 
    component: InicioComponent  },

  { path: ROUTES.INTERNAL_ROUTES.MENUBYCATEGORY, 
  component: MenuByCategoryComponent  },
  
 { 
    path: ROUTES.INTERNAL_ROUTES.ADMINISTRATION, 
    component: InicioAdminComponent, 
    children:[
      {path: ROUTES.INTERNAL_ROUTES.CARROUSEL, component: CarrouselComponent },
      {path: ROUTES.INTERNAL_ROUTES.FOOD, component: FoodComponent },
      {path: ROUTES.INTERNAL_ROUTES.CATEGORY, component: CategoryComponent },
      {path: ROUTES.INTERNAL_ROUTES.MENU, component: MenuInicioComponent}
    ],
    
    canActivate: [ AuthGuard ]
  },

  {path: '**', redirectTo: ROUTES.INTERNAL_ROUTES.INICIO}

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]

})
export class AppRoutingModule { }
