import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorInterceptor } from './core/services/interceptor/token-interceptor.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {DatePipe} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
     BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatDatepickerModule ,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorInterceptor,multi:true},DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
