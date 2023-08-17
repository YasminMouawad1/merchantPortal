import { NgModule } from "@angular/core"; 
import { SearchClaimsPipe } from "./searchClaims.pipe";
import { SearchRangeDatePipe } from "./searchRangeDate.pipe";
import { SearchTransactionsPipe } from './searchTransactions.pipe'; 

@NgModule({
    imports:[
    
    
    ],
    declarations: [  
        SearchTransactionsPipe ,
        SearchClaimsPipe,
        SearchRangeDatePipe
    ],
    exports: [  
        SearchTransactionsPipe,
        SearchClaimsPipe, 
        SearchRangeDatePipe
    ]
  })
  export class MyPipesModule {}