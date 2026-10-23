import { MatDialogConfig } from '@angular/material/dialog';
import { MenuViewer } from './shared/models/MenuViewer';
import { CategoryViewer } from './shared/models/CategoryViewer';

export class Utils {

  public static timeNotification: any = 5000;

  constructor() {
  }

  public static handleError(error: any): Promise<any> {
    console.error('Ocurrió un error ', error);
    return Promise.reject(error.message || error);
  }

  public static matDialogConfigDefault(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px'
    return dialogConfig;
  }

  public static matDialogConfigMenu(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px'
    return dialogConfig;
  }

  public static getDaysOfDate(dateStart: Date, dateEnd: Date) : any[] {
    const WEEKDAY = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]; 
    let daysOfMonth: any[] = [];
    let dateStartAux = new Date(dateStart);
    let dateEndAux = new Date(dateEnd);
    const CANTDAYS = (dateEndAux?.getTime() - dateStartAux?.getTime())/(1000*60*60*24)+1;
    let currentDate = new Date(dateStartAux);
    let currentDay : string;
    for(let i = 0; i < CANTDAYS; i++){
        currentDay = WEEKDAY[dateStartAux.getDay()];
        if (currentDay != 'Sábado' && currentDay != 'Domingo'){     
            const ITEM = ({
                date: currentDate, 
                day: currentDay 
            })
            daysOfMonth.push(ITEM);
        }
        currentDate = new Date(dateStartAux.setDate(dateStartAux.getDate() + 1));
    }
    return daysOfMonth;

}

  public static getDayOfDate(date: Date) : string {
  date = new Date(date)
  const WEEKDAY = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]; 
  let currentDay = WEEKDAY[date.getDay()];
          return currentDay;
  }

    //funcion que recibe un menuViewer y junta todo en un solo turnViewer para mostrar mejor el menú
    public static orderMenuViewerByTurn (menuViewer: MenuViewer) : MenuViewer {
        var newMenuViewer = new MenuViewer(null)
        newMenuViewer.turnsViewer = [];
        menuViewer.turnsViewer?.forEach(turn => {
            if (newMenuViewer.turnsViewer.length == 0){
                newMenuViewer = {
                    dateEnd: menuViewer.dateEnd,
                    dateStart: menuViewer.dateStart,
                    id: 0,
                    turnsViewer: new Array(turn)
                }
            } else newMenuViewer.turnsViewer.forEach(newTurn => {
                turn.categoryViewer.forEach(cat => {
                    newTurn.categoryViewer.forEach(newCat => {
                        if(cat.category.id == newCat.category.id)
                            newCat.daysViewer = [...newCat.daysViewer, ...cat.daysViewer]
                    })
                })
            })
        })
        newMenuViewer.turnsViewer[0].categoryViewer.forEach(cat => {
            cat.daysViewer.sort((a,b)=>a.date.getTime()-b.date.getTime())
        })
        return newMenuViewer
    }

    public static containFeriado(str: string) : boolean {
        if (str.toLowerCase().includes('feriado')) {
            return true;
          } else {
            return false;
          }
    }
  

}


