import { Pipe, PipeTransform } from '@angular/core'; 
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'searchRangeDate'
})
 

export class SearchRangeDatePipe implements PipeTransform {

    constructor(private datePipe: DatePipe){

    }

  transform(TransactionList:any[],start:string, end:string): any[] {

    let startDate =  this.datePipe.transform(start,"/MM/dd/yyyy");
    let endDate = this.datePipe.transform(end,"MM/dd/yyyy");

 

    if(!startDate || !endDate){
       
        return TransactionList;
    
        }
        else{

            let sDate = new Date(startDate).getTime();
            let eDate = new Date(endDate).getTime();


            
            const self = this;

            return TransactionList.filter(function(v) {

                let bookDate : any = self.getDateFromString(v["bookingDate"])
               

                if ( bookDate >= sDate && bookDate <= eDate)
                  return v
              })     
        }


        //else{
        //   let sDate = new Date(startDate);
        //   let eDate = new Date(endDate);
        //   let a = TransactionList.filter(
        //     m => new Date(m.bookingDate) >= sDate && new Date(m.bookingDate) <= eDate
        //   ) 
        //   return a;
        // }   
 
   
  }


  getDateFromString(date:any){
    date = date.split('/')
    date = `${date[1]}/${date[0]}/${date[2]}`;
   return new Date(date).getTime();

}

} 