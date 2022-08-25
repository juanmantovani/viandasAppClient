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

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
  }

  closeSesion (){
    this.authService.logout();
  }

}
