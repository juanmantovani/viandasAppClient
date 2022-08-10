import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
//import { LoggingService } from './services/logging.service';
import { ErrorService } from './services/error.service';
import { NotificationService } from './services/notification.service';
import { MatNotificationComponent } from './components/mat-notification/mat-notification.component';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector, private notifier: MatNotificationComponent) { }
  
  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    //const logger = this.injector.get(LoggingService);
    //const notifier = this.injector.get(MatNotificationComponent);

    let message;
    //let stackTrace;
    if (error instanceof HttpErrorResponse) {
      // Server error
      message = errorService.getServerMessage(error);
      //stackTrace = errorService.getServerErrorStackTrace(error);
      this.notifier.showDanger(message);
    } else {
      // Client Error
      message = errorService.getClientMessage(error);
      this.notifier.showDanger(message);
    }
    // Always log errors
    //logger.logError(message, stackTrace);

  }
}