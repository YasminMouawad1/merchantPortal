import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTransactions'
})
 

export class SearchTransactionsPipe implements PipeTransform {

  transform(TransactionList:any[],term:any): any[] {
    
         return TransactionList.filter(function(v) {
          return ((v["debtRecordCode"] == (parseInt(term))  || v["branchAname"].includes(term) || v["clientAname"].includes(term) 
              || v["nationalId"].includes(term) || v["statusAname"].includes(term) || v["bookingDate"].includes(term)))
        })       
 
   
  }

} 