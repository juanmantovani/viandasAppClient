import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CarrouselComponent } from './components/administracion/carrousel/carrousel.component';
import { InicioAdminComponent } from './components/administracion/inicio-admin/inicio-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './components/administracion/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuComponent,
    FooterComponent,
    HeaderComponent,
    CarrouselComponent,
    InicioAdminComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    BrowserAnimationsModule,
    MatSidenavModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
