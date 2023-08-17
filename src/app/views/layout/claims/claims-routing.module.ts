import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';    
import { AuthGaurdGuard } from 'src/app/shared/services/endpoints/auth-gaurd.guard';
import { ClaimListComponent } from './claim-list/claim-list.component';
 
const routes: Routes = [ 
   {path:'',component:ClaimListComponent,pathMatch:'full'},
   {path:'claims',component:ClaimListComponent ,title:'Claims'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimsRoutingModule { }