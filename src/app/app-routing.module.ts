import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrouselComponent } from './components/administration/carrousel/carrousel.component';
import { InicioAdminComponent } from './components/administration/inicio-admin/inicio-admin.component';
import { InicioComponent } from './components/inicio/inicio.component';
import  * as ROUTES  from './shared/routes/index.routes'
import { FoodComponent } from './components/administration/food/food.component';
import { MenuInicioComponent } from './components/administration/menu/inicio/inicio.component';
import { CategoryComponent } from './components/administration/category/category.component';
import { MenuByCategoryComponent } from './components/menu/menu-by-category/menu-by-category.component';
import { AuthGuard } from './auth/auth.guard';
import { InicioClientComponent } from './components/clients/inicio-client/inicio-client.component';
import { ProfileComponent } from './components/clients/profile/profile.component';
import { PathologyComponent } from './components/administration/pathology/pathology.component';
import { InicioOrderComponent } from './components/clients/order/inicio/inicio-order.component';
import { DeliveryDriverComponent } from './components/administration/delivery-driver/delivery-driver.component';
import { InicioOrdersComponent } from './components/clients/orders/inicio-orders/inicio-orders.component';
import { AddressesComponent } from './components/clients/addresses/addresses.component';
import { TandaComponent } from './components/administration/tanda/tanda.component';
import { ClientComponent } from './components/administration/client/client.component';
import { OrderComponent } from './components/administration/order/order.component';



const routes: Routes = [


  {path: '', redirectTo: ROUTES.INTERNAL_ROUTES.INICIO, pathMatch: 'full' },
  

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
      {path: ROUTES.INTERNAL_ROUTES.MENU, component: MenuInicioComponent},
      {path: ROUTES.INTERNAL_ROUTES.PATHOLOGY, component: PathologyComponent},
      {path: ROUTES.INTERNAL_ROUTES.DELIVERYDRIVER, component: DeliveryDriverComponent},
      {path: ROUTES.INTERNAL_ROUTES.TANDA, component: TandaComponent},
      {path: ROUTES.INTERNAL_ROUTES.CLIENT, component: ClientComponent},
      {path: ROUTES.INTERNAL_ROUTES.ORDER, component: OrderComponent },
    ],
    
    canActivate: [ AuthGuard ]
  },

  { path: ROUTES.INTERNAL_ROUTES.CLIENT, 
    component: InicioClientComponent,
    children:[
      {path: ROUTES.INTERNAL_ROUTES.PROFILE, component: ProfileComponent },
      {path: ROUTES.INTERNAL_ROUTES.ORDER, component: InicioOrderComponent },
      {path: ROUTES.INTERNAL_ROUTES.ORDERS, component: InicioOrdersComponent },
      {path: ROUTES.INTERNAL_ROUTES.ADDRESSES, component: AddressesComponent }



    ],
    canActivate: [ AuthGuard ]
  },

  {path: '**', redirectTo: ROUTES.INTERNAL_ROUTES.INICIO},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]

})
export class AppRoutingModule { }
