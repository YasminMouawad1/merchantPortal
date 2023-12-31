import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { IsLoggedInGuard } from 'src/app/shared/services/endpoints/is-logged-in.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo:'login' , pathMatch:'full' },
  {path:'login', component: LoginComponent , canActivate:[IsLoggedInGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }