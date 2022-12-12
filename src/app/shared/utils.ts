export class Utils {
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

}