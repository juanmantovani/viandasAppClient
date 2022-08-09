import { Component, OnInit, TemplateRef } from '@angular/core';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-mat-notification',
  templateUrl: './mat-notification.component.html',
  styleUrls: ['./mat-notification.component.css'],
  host: {'[class.ngb-toasts]': 'true'}
})
export class MatNotificationComponent {

  constructor(public notificationService : NotificationService) { }

  isTemplate(notif: any) { 
    return notif.textOrTpl instanceof TemplateRef; 
  }

  showStandard() {
    this.notificationService.show('I am a standard toast');
  }

  showSuccess() {
    this.notificationService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
  }

  showDanger(dangerTpl: string) {
    this.notificationService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
  }

  ngOnDestroy(): void {
    this.notificationService.clear();
  }
}
