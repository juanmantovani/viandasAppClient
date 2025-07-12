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
                "lng": -60.5391737,
                "lat": -31.7342888
            },
            {
                "lng": -60.5384484,
                "lat": -31.7362799
            },
            {
                "lng": -60.5383412,
                "lat": -31.7375026
            },
            {
                "lng": -60.5383626,
                "lat": -31.7394917
            },
            {
                "lng": -60.5382768,
                "lat": -31.7414991
            },
            {
                "lng": -60.5389849,
                "lat": -31.742959
            },
            {
                "lng": -60.538663,
                "lat": -31.7435429
            },
            {
                "lng": -60.5359915,
                "lat": -31.7439558
            },
            {
                "lng": -60.5363563,
                "lat": -31.7452216
            },
            {
                "lng": -60.5366996,
                "lat": -31.7470007
            },
            {
                "lng": -60.5370751,
                "lat": -31.7490466
            },
            {
                "lng": -60.5373648,
                "lat": -31.7502165
            },
            {
                "lng": -60.5378369,
                "lat": -31.7533046
            },
            {
                "lng": -60.5393861,
                "lat": -31.7613099
            },
            {
                "lng": -60.5403855,
                "lat": -31.7649769
            },
            {
                "lng": -60.54087,
                "lat": -31.7686804
            },
            {
                "lng": -60.5313674,
                "lat": -31.7703634
            },
            {
                "lng": -60.5262712,
                "lat": -31.7711114
            },
            {
                "lng": -60.5241736,
                "lat": -31.7713029
            },
            {
                "lng": -60.5229345,
                "lat": -31.7668972
            },
            {
                "lng": -60.522418,
                "lat": -31.7647153
            },
            {
                "lng": -60.5219774,
                "lat": -31.7611703
            },
            {
                "lng": -60.5209572,
                "lat": -31.7574429
            },
            {
                "lng": -60.5198118,
                "lat": -31.7509198
            },
            {
                "lng": -60.5183876,
                "lat": -31.7448712
            },
            {
                "lng": -60.5174005,
                "lat": -31.740227
            },
            {
                "lng": -60.5176151,
                "lat": -31.7382105
            },
            {
                "lng": -60.5182482,
                "lat": -31.7361666
            },
            {
                "lng": -60.5178942,
                "lat": -31.7331372
            },
            {
                "lng": -60.5209626,
                "lat": -31.7318141
            },
            {
                "lng": -60.527593,
                "lat": -31.7300895
            },
            {
                "lng": -60.5361117,
                "lat": -31.7275707
            },
            {
                "lng": -60.5391737,
                "lat": -31.7342888
            }
        ],
        [
            {
                "lng": -60.5366184,
                "lat": -31.7245728
            },
            {
                "lng": -60.5408081,
                "lat": -31.7262413
            },
            {
                "lng": -60.5384746,
                "lat": -31.7285973
            },
            {
                "lng": -60.5410066,
                "lat": -31.7331447
            },
            {
                "lng": -60.5400087,
                "lat": -31.735195
            },
            {
                "lng": -60.5404218,
                "lat": -31.7371554
            },
            {
                "lng": -60.5409609,
                "lat": -31.7396503
            },
            {
                "lng": -60.5417468,
                "lat": -31.7431761
            },
            {
                "lng": -60.5410494,
                "lat": -31.7557481
            },
            {
                "lng": -60.5446543,
                "lat": -31.7738457
            },
            {
                "lng": -60.5314364,
                "lat": -31.7751683
            },
            {
                "lng": -60.5251278,
                "lat": -31.7761168
            },
            {
                "lng": -60.5199261,
                "lat": -31.7768502
            },
            {
                "lng": -60.5175138,
                "lat": -31.7673679
            },
            {
                "lng": -60.5166889,
                "lat": -31.7645694
            },
            {
                "lng": -60.5164446,
                "lat": -31.762339
            },
            {
                "lng": -60.5161629,
                "lat": -31.7611395
            },
            {
                "lng": -60.5158222,
                "lat": -31.759431
            },
            {
                "lng": -60.5145948,
                "lat": -31.7549545
            },
            {
                "lng": -60.5144203,
                "lat": -31.7533123
            },
            {
                "lng": -60.5141521,
                "lat": -31.7523042
            },
            {
                "lng": -60.5138625,
                "lat": -31.7509311
            },
            {
                "lng": -60.5133072,
                "lat": -31.7484804
            },
            {
                "lng": -60.5130208,
                "lat": -31.7470215
            },
            {
                "lng": -60.5128991,
                "lat": -31.7462008
            },
            {
                "lng": -60.5126486,
                "lat": -31.74538
            },
            {
                "lng": -60.5121834,
                "lat": -31.7430826
            },
            {
                "lng": -60.5117248,
                "lat": -31.7408791
            },
            {
                "lng": -60.5168396,
                "lat": -31.7385092
            },
            {
                "lng": -60.5162967,
                "lat": -31.7331587
            },
            {
                "lng": -60.5186967,
                "lat": -31.7312546
            },
            {
                "lng": -60.5226847,
                "lat": -31.7303541
            },
            {
                "lng": -60.5263205,
                "lat": -31.7293698
            },
            {
                "lng": -60.5298009,
                "lat": -31.7284764
            },
            {
                "lng": -60.5320163,
                "lat": -31.7262501
            },
            {
                "lng": -60.5346298,
                "lat": -31.7251958
            },
            {
                "lng": -60.5366184,
                "lat": -31.7245728
            }
        ],
        [
            {
                "lng": -60.547503,
                "lat": -31.7269349
            },
            {
                "lng": -60.546596,
                "lat": -31.7272732
            },
            {
                "lng": -60.5488369,
                "lat": -31.7269727
            },
            {
                "lng": -60.5498152,
                "lat": -31.728843
            },
            {
                "lng": -60.5523048,
                "lat": -31.731234
            },
            {
                "lng": -60.5533243,
                "lat": -31.7326486
            },
            {
                "lng": -60.5519185,
                "lat": -31.7348664
            },
            {
                "lng": -60.5476694,
                "lat": -31.7403792
            },
            {
                "lng": -60.5441774,
                "lat": -31.7490182
            },
            {
                "lng": -60.5431103,
                "lat": -31.7556673
            },
            {
                "lng": -60.5491662,
                "lat": -31.7594569
            },
            {
                "lng": -60.5502956,
                "lat": -31.761518
            },
            {
                "lng": -60.5525306,
                "lat": -31.7636408
            },
            {
                "lng": -60.550924,
                "lat": -31.7647195
            },
            {
                "lng": -60.5511006,
                "lat": -31.7690661
            },
            {
                "lng": -60.5506709,
                "lat": -31.773444
            },
            {
                "lng": -60.5495645,
                "lat": -31.7752993
            },
            {
                "lng": -60.5460117,
                "lat": -31.7765526
            },
            {
                "lng": -60.5359401,
                "lat": -31.7771861
            },
            {
                "lng": -60.5273181,
                "lat": -31.7785097
            },
            {
                "lng": -60.5185995,
                "lat": -31.779851
            },
            {
                "lng": -60.5177429,
                "lat": -31.7771964
            },
            {
                "lng": -60.5166739,
                "lat": -31.7771
            },
            {
                "lng": -60.5143826,
                "lat": -31.7767875
            },
            {
                "lng": -60.5111471,
                "lat": -31.7727537
            },
            {
                "lng": -60.5065417,
                "lat": -31.7737294
            },
            {
                "lng": -60.4919766,
                "lat": -31.7724495
            },
            {
                "lng": -60.4855924,
                "lat": -31.7668741
            },
            {
                "lng": -60.4767456,
                "lat": -31.7594838
            },
            {
                "lng": -60.4794437,
                "lat": -31.7493928
            },
            {
                "lng": -60.4836703,
                "lat": -31.7347916
            },
            {
                "lng": -60.4889507,
                "lat": -31.7308687
            },
            {
                "lng": -60.4992941,
                "lat": -31.7271636
            },
            {
                "lng": -60.5205343,
                "lat": -31.7222868
            },
            {
                "lng": -60.5271021,
                "lat": -31.7208969
            },
            {
                "lng": -60.5318418,
                "lat": -31.7200151
            },
            {
                "lng": -60.5349981,
                "lat": -31.720356
            },
            {
                "lng": -60.5359819,
                "lat": -31.7225358
            },
            {
                "lng": -60.5392421,
                "lat": -31.7226837
            },
            {
                "lng": -60.5426185,
                "lat": -31.7224634
            },
            {
                "lng": -60.5444067,
                "lat": -31.723247
            },
            {
                "lng": -60.5462021,
                "lat": -31.7250423
            },
            {
                "lng": -60.547503,
                "lat": -31.7269349
            }
        ]
    ]

    return zones
    
     /*var polygons : string = "(-60.547503 -31.7269349, -60.546596 -31.7272732, -60.5488369 -31.7269727, ";
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


