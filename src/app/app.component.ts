import { Component, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { Router } from '@angular/router';
import {NgbOffcanvas, OffcanvasDismissReasons, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './shared/services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService : AuthService, private router: Router) {}
  
  ngOnInit() {
    if (!this.authService.isAutenticated()) {
      this.router.navigate(['login'])
    };

  }
}
