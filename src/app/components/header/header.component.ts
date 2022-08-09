import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../app.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild("myNameElem") myNameElem: ElementRef;
  @ViewChild("myNameElem2") myNameElem2: ElementRef;
  
 // @ViewChild('hello', { static: false }) divHello: ElementRef;

  constructor() { }

  ngOnInit(): void {
    
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
