import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
 
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 


@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }
