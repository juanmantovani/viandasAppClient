import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-mat-notification',
  templateUrl: './mat-notification.component.html',
  styleUrls: ['./mat-notification.component.css'],
  host: {'class': 'toast-container position-fixed top-0 end-0 p-3', 'style': 'z-index: 1200'}
})
export class MatNotificationComponent implements OnDestroy{

  constructor(public notificationService : NotificationService) { }

  isTemplate(notif: any) { 
    return notif.textOrTpl instanceof TemplateRef; 
  }

  showStandard(message: string) {
    this.notificationService.show(message);
  }

  showSuccess(message: string) {
    this.notificationService.show(message, {
      classname: 'bg-success text-light', 
      delay: 7000,
      autohide: true, 
    });
  }

  showDanger(message: string) {
    this.notificationService.show(message, { 
      classname: 'bg-danger text-light', 
      delay: 7000,
      autohide: true, 
    });
  }

  ngOnDestroy(): void {
    this.notificationService.clear();
  }
}
