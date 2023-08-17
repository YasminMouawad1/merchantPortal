import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchClaims'
})
 

export class SearchClaimsPipe implements PipeTransform {

  transform(TransactionList:any[],term:any): any[] {
    
         return TransactionList.filter(function(v) {
          return ((v["claimNo"] == (parseInt(term))  || v["statusAname"].includes(term)))
      
        })       
 
   
  }

} 