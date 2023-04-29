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
    let daysOfMonth: any[] = new Array(null);
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
              "lng": -60.5190292,
              "lat": -31.7474661
          },
          {
              "lng": -60.5138762,
              "lat": -31.7231723
          },
          {
              "lng": -60.5199755,
              "lat": -31.720471
          },
          {
              "lng": -60.5246318,
              "lat": -31.7194124
          },
          {
              "lng": -60.5290521,
              "lat": -31.7187735
          },
          {
              "lng": -60.5324639,
              "lat": -31.7178974
          },
          {
              "lng": -60.5351676,
              "lat": -31.7168205
          },
          {
              "lng": -60.5424846,
              "lat": -31.7288667
          },
          {
              "lng": -60.5397101,
              "lat": -31.7321537
          },
          {
              "lng": -60.5401435,
              "lat": -31.7338163
          },
          {
              "lng": -60.539886,
              "lat": -31.7341083
          },
          {
              "lng": -60.5400792,
              "lat": -31.7344733
          },
          {
              "lng": -60.5405942,
              "lat": -31.7343821
          },
          {
              "lng": -60.5410018,
              "lat": -31.7348018
          },
          {
              "lng": -60.5395427,
              "lat": -31.7354588
          },
          {
              "lng": -60.5329123,
              "lat": -31.7407875
          },
          {
              "lng": -60.5322471,
              "lat": -31.7407875
          },
          {
              "lng": -60.5286851,
              "lat": -31.7459288
          },
          {
              "lng": -60.5275157,
              "lat": -31.7461638
          },
          {
              "lng": -60.5262926,
              "lat": -31.7463713
          },
          {
              "lng": -60.5238357,
              "lat": -31.7467362
          },
          {
              "lng": -60.5190292,
              "lat": -31.7474661
          }
      ],
      [
          {
              "lng": -60.5006605,
              "lat": -31.7171556
          },
          {
              "lng": -60.5017913,
              "lat": -31.7151626
          },
          {
              "lng": -60.5016379,
              "lat": -31.713185
          },
          {
              "lng": -60.5020853,
              "lat": -31.7111344
          },
          {
              "lng": -60.5048414,
              "lat": -31.7116833
          },
          {
              "lng": -60.5077692,
              "lat": -31.7123051
          },
          {
              "lng": -60.5179786,
              "lat": -31.7183148
          },
          {
              "lng": -60.5361892,
              "lat": -31.7162497
          },
          {
              "lng": -60.5379273,
              "lat": -31.7153917
          },
          {
              "lng": -60.5412747,
              "lat": -31.7147802
          },
          {
              "lng": -60.541233,
              "lat": -31.7165906
          },
          {
              "lng": -60.5429295,
              "lat": -31.7195328
          },
          {
              "lng": -60.5452281,
              "lat": -31.7208173
          },
          {
              "lng": -60.5465397,
              "lat": -31.7224851
          },
          {
              "lng": -60.5476798,
              "lat": -31.7243355
          },
          {
              "lng": -60.5498256,
              "lat": -31.7265439
          },
          {
              "lng": -60.5471891,
              "lat": -31.7296838
          },
          {
              "lng": -60.5468632,
              "lat": -31.7300548
          },
          {
              "lng": -60.5465615,
              "lat": -31.7304074
          },
          {
              "lng": -60.546587,
              "lat": -31.7308399
          },
          {
              "lng": -60.5462745,
              "lat": -31.731188
          },
          {
              "lng": -60.5454859,
              "lat": -31.7320998
          },
          {
              "lng": -60.5454054,
              "lat": -31.7323204
          },
          {
              "lng": -60.5455985,
              "lat": -31.7332907
          },
          {
              "lng": -60.5464031,
              "lat": -31.7369652
          },
          {
              "lng": -60.5467947,
              "lat": -31.7388343
          },
          {
              "lng": -60.5469905,
              "lat": -31.739778
          },
          {
              "lng": -60.5471756,
              "lat": -31.7406579
          },
          {
              "lng": -60.5415215,
              "lat": -31.7427564
          },
          {
              "lng": -60.5360712,
              "lat": -31.7448366
          },
          {
              "lng": -60.5330672,
              "lat": -31.7467435
          },
          {
              "lng": -60.5265011,
              "lat": -31.7511592
          },
          {
              "lng": -60.5189801,
              "lat": -31.7526418
          },
          {
              "lng": -60.518148,
              "lat": -31.7527467
          },
          {
              "lng": -60.5179037,
              "lat": -31.7527786
          },
          {
              "lng": -60.5176649,
              "lat": -31.7528197
          },
          {
              "lng": -60.5174769,
              "lat": -31.7528516
          },
          {
              "lng": -60.5172085,
              "lat": -31.7528927
          },
          {
              "lng": -60.5166607,
              "lat": -31.7529748
          },
          {
              "lng": -60.5163654,
              "lat": -31.7530204
          },
          {
              "lng": -60.5160539,
              "lat": -31.7530569
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
              "lng": -60.5122624,
              "lat": -31.7463654
          },
          {
              "lng": -60.5094368,
              "lat": -31.7477904
          },
          {
              "lng": -60.507562,
              "lat": -31.7487621
          },
          {
              "lng": -60.5006605,
              "lat": -31.7171556
          }
      ],
      [
          {
              "lng": -60.5024373,
              "lat": -31.7088846
          },
          {
              "lng": -60.5181809,
              "lat": -31.7181695
          },
          {
              "lng": -60.5297463,
              "lat": -31.7167983
          },
          {
              "lng": -60.5346353,
              "lat": -31.7158263
          },
          {
              "lng": -60.53723,
              "lat": -31.7144776
          },
          {
              "lng": -60.5387732,
              "lat": -31.7134575
          },
          {
              "lng": -60.5402609,
              "lat": -31.7125802
          },
          {
              "lng": -60.5415339,
              "lat": -31.7117576
          },
          {
              "lng": -60.5432431,
              "lat": -31.7109977
          },
          {
              "lng": -60.5459319,
              "lat": -31.7101168
          },
          {
              "lng": -60.5476808,
              "lat": -31.7095966
          },
          {
              "lng": -60.5497299,
              "lat": -31.7089942
          },
          {
              "lng": -60.5517362,
              "lat": -31.7082457
          },
          {
              "lng": -60.5529485,
              "lat": -31.710564
          },
          {
              "lng": -60.5576264,
              "lat": -31.7124439
          },
          {
              "lng": -60.5564569,
              "lat": -31.7143696
          },
          {
              "lng": -60.5550514,
              "lat": -31.7165874
          },
          {
              "lng": -60.5548368,
              "lat": -31.7226841
          },
          {
              "lng": -60.5542203,
              "lat": -31.7309947
          },
          {
              "lng": -60.5529382,
              "lat": -31.7351989
          },
          {
              "lng": -60.5522997,
              "lat": -31.7411779
          },
          {
              "lng": -60.5534288,
              "lat": -31.743239
          },
          {
              "lng": -60.5535726,
              "lat": -31.7435109
          },
          {
              "lng": -60.5536628,
              "lat": -31.7438923
          },
          {
              "lng": -60.5538539,
              "lat": -31.744655
          },
          {
              "lng": -60.5524551,
              "lat": -31.7448667
          },
          {
              "lng": -60.5467688,
              "lat": -31.7457334
          },
          {
              "lng": -60.5448054,
              "lat": -31.7460345
          },
          {
              "lng": -60.543821,
              "lat": -31.7462375
          },
          {
              "lng": -60.5435877,
              "lat": -31.7464405
          },
          {
              "lng": -60.5415331,
              "lat": -31.7474304
          },
          {
              "lng": -60.5392156,
              "lat": -31.7456787
          },
          {
              "lng": -60.5381094,
              "lat": -31.7463665
          },
          {
              "lng": -60.5369601,
              "lat": -31.7471821
          },
          {
              "lng": -60.5390761,
              "lat": -31.7589071
          },
          {
              "lng": -60.5304559,
              "lat": -31.7602307
          },
          {
              "lng": -60.5217389,
              "lat": -31.761572
          },
          {
              "lng": -60.5049211,
              "lat": -31.7643166
          },
          {
              "lng": -60.5044866,
              "lat": -31.7618536
          },
          {
              "lng": -60.504162,
              "lat": -31.7605308
          },
          {
              "lng": -60.5038482,
              "lat": -31.7593176
          },
          {
              "lng": -60.5023296,
              "lat": -31.7519814
          },
          {
              "lng": -60.5005377,
              "lat": -31.7445815
          },
          {
              "lng": -60.4973508,
              "lat": -31.7289241
          },
          {
              "lng": -60.4943683,
              "lat": -31.7157826
          },
          {
              "lng": -60.4999908,
              "lat": -31.7150717
          },
          {
              "lng": -60.5024373,
              "lat": -31.7088846
          }
      ]
  ]

    return zones;
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
        menuViewer.turnsViewer.forEach(turn => {
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


