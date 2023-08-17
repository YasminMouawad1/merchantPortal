import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  
import { AuthGaurdGuard } from 'src/app/shared/services/endpoints/auth-gaurd.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
 
const routes: Routes = [ 
   {path:'',component:DashboardComponent,pathMatch:'full'},
   {path:'dashboard',component:DashboardComponent ,title:'dashboard'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }