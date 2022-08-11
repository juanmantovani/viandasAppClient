import { Injectable, NgZone, OnDestroy, TemplateRef } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private zone: NgZone) { }

  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.zone.run(
      () => {this.toasts.push({ textOrTpl, ...options });
    });
  }

  remove(toast: any) {
    this.zone.run(() => {
    this.toasts = this.toasts.filter(t => t !== toast);
    })
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
  
}
