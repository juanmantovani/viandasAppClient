import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  opened = false;

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
  }

  closeSesion (){
    this.authService.logout();
  }

}
