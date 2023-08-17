import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimListComponent } from './claim-list/claim-list.component';
import { ClaimsComponent } from './claims/claims.component';


import { ClaimsRoutingModule } from './claims-routing.module';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MyPipesModule } from 'src/app/shared/pipes/PipesModule.module';

@NgModule({
  declarations: [
    ClaimListComponent,
    ClaimsComponent
  ],
  imports: [
    CommonModule,
    ClaimsRoutingModule,
    RouterModule,
    FormsModule,
    MyPipesModule
  ]
})
export class ClaimsModule { }
