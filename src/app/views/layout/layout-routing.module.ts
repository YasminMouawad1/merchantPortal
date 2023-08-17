import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';     
import { AuthGaurdGuard } from 'src/app/shared/services/endpoints/auth-gaurd.guard';
import { LayoutComponent } from './layout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
 

const routes: Routes = [
 
  {
    path: '',component: LayoutComponent,children: [
  { path: "",pathMatch: "full",redirectTo: "dashboard"},
  { path: 'dashboard', loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule) },
  { path: 'transactions', loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule) },
  { path: 'claims', loadChildren: () => import('./claims/claims.module').then(m => m.ClaimsModule) },
  { path: 'change-password',component: ChangePasswordComponent},
  ]
 },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class LayoutRoutingModule { }



