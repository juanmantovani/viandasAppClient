import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendar-food',
  templateUrl: './calendar-food.component.html',
  styleUrls: ['./calendar-food.component.css']
})
export class CalendarFoodComponent implements OnInit {

  @Input() events : any[];
  @Output() selectMenu : EventEmitter <number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.inicialiceCalendar();

  }

  inicialiceCalendar(){
    let calendarEl: HTMLElement = document.getElementById('calendarFood')!;
    
    let calendar = new Calendar(calendarEl, {
      weekends: false,
      plugins: [ dayGridPlugin ],
      navLinks: true,
      expandRows: true,
      initialView: 'dayGridDay',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      locale: esLocale,
      events: this.events,
      eventClick: this.clickEvent.bind(this),
    });
    calendar.render();
  }

  clickEvent(event: any): void {
    //this.selectMenu.emit(event.event?.extendedProps?.idMenu);    
  }

}
