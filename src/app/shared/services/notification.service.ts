import { Injectable, NgZone, TemplateRef } from '@angular/core';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private zone: NgZone) { }

  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }


  // showSuccess(message: string): void {
  //   this.zone.run(() => {
  //   this.toast.show();
  //   });
  // }

  // showError(message: string): void {
  //   // The second parameter is the text in the button. 
  //   // In the third, we send in the css class for the snack bar.
  //   this.zone.run(() => {
  //   this.toast.show();
  //     //this.snackBar.open(message, 'X', {panelClass: ['snackbarError']});
  //   });
  // }
  
}
