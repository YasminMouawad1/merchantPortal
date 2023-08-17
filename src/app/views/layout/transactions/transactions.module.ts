import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { TransactionRoutingModule } from './transactions-routing.module';

import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyPipesModule } from 'src/app/shared/pipes/PipesModule.module';
 
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionListComponent 
  ],
  imports: [ 
    CommonModule,
    NgbModule,
    RouterModule,
    TransactionRoutingModule,
    ReactiveFormsModule,FormsModule,
    MyPipesModule ,
    MatDatepickerModule, 
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule
  ]
})
export class TransactionsModule { }
