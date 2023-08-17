import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';   
import { AuthGaurdGuard } from 'src/app/shared/services/endpoints/auth-gaurd.guard';
import { TransactionListComponent } from './transaction-list/transaction-list.component'; 

const routes: Routes = [ 
   {path:'',component:TransactionListComponent,pathMatch:'full'},
   {path:'transactions',component:TransactionListComponent,title:'Transactions'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }