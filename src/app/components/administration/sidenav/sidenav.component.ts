import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import  * as ROUTES  from '../../../shared/routes/index.routes'


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  opened = false;
  CARROUSEL = ROUTES.INTERNAL_ROUTES.CARROUSEL;
  FOOD = ROUTES.INTERNAL_ROUTES.FOOD;

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
  }

  closeSesion (){
    this.authService.logout();
  }

}
