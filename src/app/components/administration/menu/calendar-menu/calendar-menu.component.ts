import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';



@Component({
  selector: 'app-calendar-menu',
  templateUrl: './calendar-menu.component.html',
  styleUrls: ['./calendar-menu.component.css']
})
export class CalendarMenuComponent implements OnInit {

  @Input() events : any[];
  constructor() {
   }

  ngOnInit(): void {
    this.inicialiceCalendar();
  }

  inicialiceCalendar(){
    let calendarEl: HTMLElement = document.getElementById('calendar')!;
  
    let calendar = new Calendar(calendarEl, {
      plugins: [ dayGridPlugin ],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      locale: esLocale,

      
      events: this.events

      // options here
    });
  
      calendar.render();

  }

}
