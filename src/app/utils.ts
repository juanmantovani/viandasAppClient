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
                    "lng": -60.539174,
                    "lat": -31.734289
                },
                {
                    "lng": -60.538448,
                    "lat": -31.73628
                },
                {
                    "lng": -60.538341,
                    "lat": -31.737503
                },
                {
                    "lng": -60.538363,
                    "lat": -31.739492
                },
                {
                    "lng": -60.538277,
                    "lat": -31.741499
                },
                {
                    "lng": -60.538985,
                    "lat": -31.742959
                },
                {
                    "lng": -60.538663,
                    "lat": -31.743543
                },
                {
                    "lng": -60.535992,
                    "lat": -31.743956
                },
                {
                    "lng": -60.536356,
                    "lat": -31.745222
                },
                {
                    "lng": -60.5367,
                    "lat": -31.747001
                },
                {
                    "lng": -60.537075,
                    "lat": -31.749047
                },
                {
                    "lng": -60.537365,
                    "lat": -31.750216
                },
                {
                    "lng": -60.537837,
                    "lat": -31.753305
                },
                {
                    "lng": -60.539386,
                    "lat": -31.76131
                },
                {
                    "lng": -60.540386,
                    "lat": -31.764977
                },
                {
                    "lng": -60.54087,
                    "lat": -31.76868
                },
                {
                    "lng": -60.531367,
                    "lat": -31.770363
                },
                {
                    "lng": -60.526271,
                    "lat": -31.771111
                },
                {
                    "lng": -60.524174,
                    "lat": -31.771303
                },
                {
                    "lng": -60.522934,
                    "lat": -31.766897
                },
                {
                    "lng": -60.522418,
                    "lat": -31.764715
                },
                {
                    "lng": -60.521977,
                    "lat": -31.76117
                },
                {
                    "lng": -60.520957,
                    "lat": -31.757443
                },
                {
                    "lng": -60.519812,
                    "lat": -31.75092
                },
                {
                    "lng": -60.518388,
                    "lat": -31.744871
                },
                {
                    "lng": -60.5174,
                    "lat": -31.740227
                },
                {
                    "lng": -60.517615,
                    "lat": -31.73821
                },
                {
                    "lng": -60.518248,
                    "lat": -31.736167
                },
                {
                    "lng": -60.517894,
                    "lat": -31.733137
                },
                {
                    "lng": -60.520963,
                    "lat": -31.731814
                },
                {
                    "lng": -60.527593,
                    "lat": -31.73009
                },
                {
                    "lng": -60.536112,
                    "lat": -31.727571
                },
                {
                    "lng": -60.539174,
                    "lat": -31.734289
                }
            ]
        ,
        [
    {
        "lng": -60.536479,
        "lat": -31.724609
    },
    {
        "lng": -60.536629,
        "lat": -31.724372
    },
    {
        "lng": -60.536618,
        "lat": -31.724573
    },
    {
        "lng": -60.536479,
        "lat": -31.724609
    },
    {
        "lng": -60.536618,
        "lat": -31.724573
    },
    {
        "lng": -60.540808,
        "lat": -31.726241
    },
    {
        "lng": -60.538475,
        "lat": -31.728597
    },
    {
        "lng": -60.541007,
        "lat": -31.733145
    },
    {
        "lng": -60.540009,
        "lat": -31.735195
    },
    {
        "lng": -60.540422,
        "lat": -31.737155
    },
    {
        "lng": -60.540961,
        "lat": -31.73965
    },
    {
        "lng": -60.541747,
        "lat": -31.743176
    },
    {
        "lng": -60.541049,
        "lat": -31.755748
    },
    {
        "lng": -60.544654,
        "lat": -31.773846
    },
    {
        "lng": -60.531436,
        "lat": -31.775168
    },
    {
        "lng": -60.525128,
        "lat": -31.776117
    },
    {
        "lng": -60.519926,
        "lat": -31.77685
    },
    {
        "lng": -60.517514,
        "lat": -31.767368
    },
    {
        "lng": -60.516689,
        "lat": -31.764569
    },
    {
        "lng": -60.516445,
        "lat": -31.762339
    },
    {
        "lng": -60.516163,
        "lat": -31.76114
    },
    {
        "lng": -60.515822,
        "lat": -31.759431
    },
    {
        "lng": -60.514595,
        "lat": -31.754954
    },
    {
        "lng": -60.51442,
        "lat": -31.753312
    },
    {
        "lng": -60.514152,
        "lat": -31.752304
    },
    {
        "lng": -60.513862,
        "lat": -31.750931
    },
    {
        "lng": -60.513307,
        "lat": -31.74848
    },
    {
        "lng": -60.513021,
        "lat": -31.747022
    },
    {
        "lng": -60.512899,
        "lat": -31.746201
    },
    {
        "lng": -60.512649,
        "lat": -31.74538
    },
    {
        "lng": -60.512183,
        "lat": -31.743083
    },
    {
        "lng": -60.511725,
        "lat": -31.740879
    },
    {
        "lng": -60.51684,
        "lat": -31.738509
    },
    {
        "lng": -60.516297,
        "lat": -31.733159
    },
    {
        "lng": -60.518697,
        "lat": -31.731255
    },
    {
        "lng": -60.522685,
        "lat": -31.730354
    },
    {
        "lng": -60.52632,
        "lat": -31.72937
    },
    {
        "lng": -60.529801,
        "lat": -31.728476
    },
    {
        "lng": -60.532016,
        "lat": -31.72625
    },
    {
        "lng": -60.53463,
        "lat": -31.725196
    },
    {
        "lng": -60.536618,
        "lat": -31.724573
    },
    {
        "lng": -60.515234,
        "lat": -31.756943
    },
    {
        "lng": -60.515674,
        "lat": -31.75869
    },
    {
        "lng": -60.515753,
        "lat": -31.759084
    },
    {
        "lng": -60.515234,
        "lat": -31.756943
    },
    {
        "lng": -60.515822,
        "lat": -31.759431
    },
    {
        "lng": -60.515753,
        "lat": -31.759084
    },
    {
        "lng": -60.515802,
        "lat": -31.759288
    },
    {
        "lng": -60.516189,
        "lat": -31.76077
    },
    {
        "lng": -60.515822,
        "lat": -31.759431
    }
],
        [
    {
        "lng": -60.550749,
        "lat": -31.722745
    },
    {
        "lng": -60.550743,
        "lat": -31.722733
    },
    {
        "lng": -60.551093,
        "lat": -31.722699
    },
    {
        "lng": -60.550749,
        "lat": -31.722745
    },
    {
        "lng": -60.5494151,
        "lat": -31.722707
    },
    {
        "lng": -60.550515,
        "lat": -31.722297
    },
    {
        "lng": -60.550743,
        "lat": -31.722733
    },
    {
        "lng": -60.5495161,
        "lat": -31.722854
    },
    {
        "lng": -60.5494151,
        "lat": -31.722707
    },
    {
        "lng": -60.5495091,
        "lat": -31.723663
    },
    {
        "lng": -60.5486021,
        "lat": -31.724001
    },
    {
        "lng": -60.550843,
        "lat": -31.7237
    },
    {
        "lng": -60.551821,
        "lat": -31.725571
    },
    {
        "lng": -60.5543109,
        "lat": -31.727962
    },
    {
        "lng": -60.5553298,
        "lat": -31.729376
    },
    {
        "lng": -60.5539239,
        "lat": -31.731594
    },
    {
        "lng": -60.549675,
        "lat": -31.737107
    },
    {
        "lng": -60.5461832,
        "lat": -31.745746
    },
    {
        "lng": -60.5451162,
        "lat": -31.752395
    },
    {
        "lng": -60.551172,
        "lat": -31.756185
    },
    {
        "lng": -60.5523009,
        "lat": -31.758246
    },
    {
        "lng": -60.5545359,
        "lat": -31.760369
    },
    {
        "lng": -60.5529299,
        "lat": -31.761447
    },
    {
        "lng": -60.5531059,
        "lat": -31.765794
    },
    {
        "lng": -60.5526769,
        "lat": -31.770172
    },
    {
        "lng": -60.55157,
        "lat": -31.772027
    },
    {
        "lng": -60.5480171,
        "lat": -31.77328
    },
    {
        "lng": -60.5379465,
        "lat": -31.773914
    },
    {
        "lng": -60.5293248,
        "lat": -31.775237
    },
    {
        "lng": -60.5206062,
        "lat": -31.776579
    },
    {
        "lng": -60.5197502,
        "lat": -31.773924
    },
    {
        "lng": -60.5186803,
        "lat": -31.773828
    },
    {
        "lng": -60.5163894,
        "lat": -31.773515
    },
    {
        "lng": -60.5131545,
        "lat": -31.769481
    },
    {
        "lng": -60.5085487,
        "lat": -31.770457
    },
    {
        "lng": -60.4939842,
        "lat": -31.769177
    },
    {
        "lng": -60.4876005,
        "lat": -31.763602
    },
    {
        "lng": -60.4787538,
        "lat": -31.756211
    },
    {
        "lng": -60.4814517,
        "lat": -31.746121
    },
    {
        "lng": -60.4856786,
        "lat": -31.731519
    },
    {
        "lng": -60.4909584,
        "lat": -31.727596
    },
    {
        "lng": -60.501302,
        "lat": -31.723891
    },
    {
        "lng": -60.5225411,
        "lat": -31.719015
    },
    {
        "lng": -60.5291089,
        "lat": -31.717625
    },
    {
        "lng": -60.5338477,
        "lat": -31.716743
    },
    {
        "lng": -60.5372695,
        "lat": -31.7167031
    },
    {
        "lng": -60.5382084,
        "lat": -31.7188478
    },
    {
        "lng": -60.5412484,
        "lat": -31.719411
    },
    {
        "lng": -60.5446242,
        "lat": -31.719191
    },
    {
        "lng": -60.5464122,
        "lat": -31.719975
    },
    {
        "lng": -60.5482081,
        "lat": -31.72177
    },
    {
        "lng": -60.5495091,
        "lat": -31.723663
    },
    {
        "lng": -60.5524449,
        "lat": -31.758518
    },
    {
        "lng": -60.5525349,
        "lat": -31.758899
    },
    {
        "lng": -60.5527269,
        "lat": -31.759662
    },
    {
        "lng": -60.551327,
        "lat": -31.759873
    },
    {
        "lng": -60.5523009,
        "lat": -31.758246
    },
    {
        "lng": -60.5524449,
        "lat": -31.758518
    }
]
    ]

    return zones
    /*
     var polygons : string = "-60.550749 -31.722745, -60.550743 -31.722733, -60.551093 -31.722699, -60.550749 -31.722745, -60.5494151 -31.722707, -60.550515 -31.722297, -60.550743 -31.722733, -60.5495161 -31.722854, -60.5494151 -31.722707, -60.5495091 -31.723663, -60.5486021 -31.724001, -60.550843 -31.7237, -60.551821 -31.725571, -60.5543109 -31.727962, -60.5553298 -31.729376, -60.5539239 -31.731594, -60.549675 -31.737107, -60.5461832 -31.745746, -60.5451162 -31.752395, -60.551172 -31.756185, -60.5523009 -31.758246, -60.5545359 -31.760369, -60.5529299 -31.761447, -60.5531059 -31.765794, -60.5526769 -31.770172, -60.55157 -31.772027, -60.5480171 -31.77328, -60.5379465 -31.773914, -60.5293248 -31.775237, -60.5206062 -31.776579, -60.5197502 -31.773924, -60.5186803 -31.773828, -60.5163894 -31.773515, -60.5131545 -31.769481, -60.5085487 -31.770457, -60.4939842 -31.769177, -60.4876005 -31.763602, -60.4787538 -31.756211, -60.4814517 -31.746121, -60.4856786 -31.731519, -60.4909584 -31.727596, -60.501302 -31.723891, -60.5225411 -31.719015, -60.5291089 -31.717625, -60.5338477 -31.716743, -60.5372695 -31.7167031, -60.5382084 -31.7188478, -60.5412484 -31.719411, -60.5446242 -31.719191, -60.5464122 -31.719975, -60.5482081 -31.72177, -60.5495091 -31.723663, -60.5524449 -31.758518, -60.5525349 -31.758899, -60.5527269 -31.759662, -60.551327 -31.759873, -60.5523009 -31.758246, -60.5524449 -31.758518"

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


