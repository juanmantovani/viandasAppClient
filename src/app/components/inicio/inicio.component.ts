import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbCarouselConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css', '../../app.component.css'],
  providers: [NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None

})
export class InicioComponent implements OnInit {

  //closeResult: string;


  constructor(config: NgbCarouselConfig, private offcanvasService: NgbOffcanvas) {
    // customize default values of carousels used by this component tree
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
    config.showNavigationIndicators = false;
    config.animation = false;
    
    
    
   
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }

  ngOnInit(): void {
  }

}
