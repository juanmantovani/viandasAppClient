import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
//import { LoggingService } from './services/logging.service';
import { ErrorService } from './services/error.service';
import { NotificationService } from './services/notification.service';
import { MatNotificationComponent } from './components/mat-notification/mat-notification.component';
import { DiscordErrorLogger } from './discord-error-logger';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector, 
    private notifier: MatNotificationComponent,
    private discordErrorLogger: DiscordErrorLogger,
    private datePipe: DatePipe
    ) { }
  
  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const moment = this.getCurrentFormatMoment();
    var errorMessageLogg = moment + ' ';
    var errorMessageNotify;

    if (error instanceof HttpErrorResponse) {
      //console.log(error);
      // Server error
      let errorStatusCode = error.status;
      errorMessageNotify = errorService.getServerMessage(error);
      errorMessageLogg = this.getTextType('server') + errorMessageLogg + ' ' + errorMessageNotify.message + errorMessageNotify.error;

      if (errorStatusCode == 404 || errorStatusCode == 500 || errorStatusCode == 501 || errorStatusCode == 400)
        this.notifier.showDanger("Ocurrió un error en el servidor, vuelva a intentarlo. Cod:" + errorStatusCode) //this.notifier.showDanger(errorMessageNotify.error);
        else
        this.notifier.showDanger("Ocurrió un error  en el servidor, vuelva a intentarlo. Cod:" + errorStatusCode)//this.notifier.showDanger(errorMessageNotify.message);
    } else {
      // Client Error
      errorMessageNotify = errorService.getClientMessage(error);
      errorMessageLogg = this.getTextType('client') + errorMessageLogg + ' ' + error.message + ' ' +  this.cutStringByLines(error.stack? error.stack : '' + errorMessageNotify) ;

      //this.notifier.showStandard("Ocurrió algo inesperado: " + errorMessageNotify);
      this.notifier.showStandard("Ocurrió algo inesperado, reintente nuevamente.");
      console.log(error);

    }
    // Always log errors
    this.discordErrorLogger.logError(errorMessageLogg);


  }

  getCurrentFormatMoment(): any{
    const date = new Date();
    return this.datePipe.transform(date, 'dd/MM/yyyy hh:mm:ss');
  }

  getTextType(typeError: string): string|undefined {
    if(typeError == 'client')
      return " :warning: Client Error: ";

    if(typeError == 'server')
      return " :bangbang: Server Error: ";

  }

  cutStringByLines(texto: string): string {
    const lineas = texto.split('\n');
    const primerasCincoLineas = lineas.slice(0, 5);
    const resultado = primerasCincoLineas.join('\n');
    return resultado;
  }
}