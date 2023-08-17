import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';

 


import { StatisticsRoutingModule } from './statistics-routing.module';
import { RouterModule } from '@angular/router';
 


@NgModule({
  declarations: [
    StatisticsComponent,
    DashboardComponent,  
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    RouterModule
  ]
})
export class StatisticsModule { }
