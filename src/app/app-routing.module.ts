import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrouselComponent } from './components/administration/carrousel/carrousel.component';
import { InicioAdminComponent } from './components/administration/inicio-admin/inicio-admin.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: "/inicio", pathMatch: 'full' },
  {path: 'login', component: LoginComponent },
  {path: 'inicio', component: InicioComponent  },
 // {path: '**', redirectTo: '/'},
  { path: 'administracion', 
    component: InicioAdminComponent, 
    children:[{path: 'carrousel', component: CarrouselComponent }],
    canActivate: [ AuthGuard ]
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]

})
export class AppRoutingModule { }
