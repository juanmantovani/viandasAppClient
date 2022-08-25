import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import  * as ROUTES  from '../../shared/routes/index.routes'



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../app.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild("myNameElem") myNameElem: ElementRef;
  @ViewChild("myNameElem2") myNameElem2: ElementRef;
  
  LOGIN = ROUTES.INTERNAL_ROUTES.LOGIN;
  INICIO = ROUTES.INTERNAL_ROUTES.INICIO;
  REGISTER = ROUTES.INTERNAL_ROUTES.REGISTER;

  loginDisabled: boolean;

  constructor(private authService : AuthService) {
    this.loginDisabled = false;
   }

  ngOnInit(): void {
     this.authService.isAuthenticated()? this.loginDisabled = true : this.loginDisabled = false;
   
  }

  mostrarMenu(){

  console.log(this.myNameElem2);    

    this.myNameElem2.nativeElement.classList.toggle("list--show");
//    let el: DebugElement;

    //const menuHamburguesa = el.query(By.css(".nav__logo"));

  /*menuHamburguesa.addEventListener("click", () => {
  let menu = document.querySelector(".list");

  menu.classList.toggle("list--show");

  


});
*/
  }

}
