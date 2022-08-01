import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrouselComponent } from './components/administracion/carrousel/carrousel.component';
import { InicioAdminComponent } from './components/administracion/inicio-admin/inicio-admin.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: "/inicio", pathMatch: 'full' },
  {path: 'login', component: LoginComponent },
  {path: 'inicio', component: InicioComponent  },
 // {path: '**', redirectTo: '/'},
  {path: 'administracion', component: InicioAdminComponent , children:[
      {path: 'carrousel', component: CarrouselComponent }
  ] },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
