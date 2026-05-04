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

    
  public static getZones() : any [] {

    
    const zones : any [] =[
                [
    {
        "lng": -60.5295354,
        "lat": -31.7963851
    },
    {
        "lng": -60.5125489,
        "lat": -31.7166208
    },
    {
        "lng": -60.5202307,
        "lat": -31.7183366
    },
    {
        "lng": -60.5282344,
        "lat": -31.7183366
    },
    {
        "lng": -60.5332984,
        "lat": -31.7167303
    },
    {
        "lng": -60.5354442,
        "lat": -31.7140288
    },
    {
        "lng": -60.5556144,
        "lat": -31.7047555
    },
    {
        "lng": -60.5693473,
        "lat": -31.703295
    },
    {
        "lng": -60.5779304,
        "lat": -31.7114732
    },
    {
        "lng": -60.5961265,
        "lat": -31.7856285
    },
    {
        "lng": -60.5295354,
        "lat": -31.7963851
    }

            ]
        ,
        [
    {
        "lng": -60.5125489,
        "lat": -31.7166208
    },
    {
        "lng": -60.5295354,
        "lat": -31.7963851
    },
    {
        "lng": -60.4655275,
        "lat": -31.8027336
    },
    {
        "lng": -60.450078,
        "lat": -31.7833647
    },
    {
        "lng": -60.4336066,
        "lat": -31.7055031
    },
    {
        "lng": -60.4740328,
        "lat": -31.7025822
    },
    {
        "lng": -60.4826588,
        "lat": -31.7021076
    },
    {
        "lng": -60.4927868,
        "lat": -31.7040792
    },
    {
        "lng": -60.5009837,
        "lat": -31.7070001
    },
    {
        "lng": -60.5061335,
        "lat": -31.7105415
    },
    {
        "lng": -60.5125489,
        "lat": -31.7166208
    }

        ]
    ]
    return zones
    
    /* var polygons : string = "-60.5125489 -31.7166208, -60.5295354 -31.7963851, -60.4655275 -31.8027336, -60.450078 -31.7833647, -60.4336066 -31.7055031, -60.4740328 -31.7025822, -60.4826588 -31.7021076, -60.4927868 -31.7040792, -60.5009837 -31.7070001, -60.5061335 -31.7105415, -60.5125489 -31.7166208"

;
     console.log(this.convertCsvToObjet(polygons))
        return []*/
  }

  //funcion que recibe el csv con lat y lng y lo convierte
   private static convertCsvToObjet(polygonCsv : string) : any []{
      const polygonString = polygonCsv;
      const polygonPoints = polygonString.split(", ");
      
      const polygonLatLng = polygonPoints.map(point => {
        const [lng, lat] = point.split(" ");
        return {lng: parseFloat(lng), lat: parseFloat(lat)};
      });
      return polygonLatLng
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


