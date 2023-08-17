import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
 

import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component'; 
import { LayoutRoutingModule } from './layout-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { FooterComponent } from './footer/footer.component';
import { ChangePasswordComponent } from './change-password/change-password.component';





@NgModule({
  declarations: [
    LayoutComponent, 
    NavbarComponent,
    HeaderComponent,
   SpinnerComponent,
   FooterComponent,
   ChangePasswordComponent 
  ],
  imports: [
    CommonModule, 
    RouterModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LayoutModule { }
