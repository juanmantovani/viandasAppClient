import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrouselComponent } from './components/administration/carrousel/carrousel.component';
import { InicioAdminComponent } from './components/administration/inicio-admin/inicio-admin.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/services/auth.guard';
import { NoAuthGuard } from './shared/services/no-auth.guard';
import  * as ROUTES  from './shared/routes/index.routes'


const routes: Routes = [
  {path: '', redirectTo: ROUTES.INTERNAL_ROUTES.INICIO, pathMatch: 'full' },
  
  {
    path: ROUTES.INTERNAL_ROUTES.LOGIN, 
    component: LoginComponent,
    canActivate: [ NoAuthGuard ]
  },

  { path: ROUTES.INTERNAL_ROUTES.INICIO
    , component: InicioComponent  },
 // {path: '**', redirectTo: '/'},
  
 { 
    path: ROUTES.INTERNAL_ROUTES.ADMINISTRATION, 
    component: InicioAdminComponent, 
    children:[{path: ROUTES.INTERNAL_ROUTES.CARROUSEL, component: CarrouselComponent }],
    canActivate: [ AuthGuard ]
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]

})
export class AppRoutingModule { }
