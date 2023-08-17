import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthEndpoints } from '../../../shared/services/endpoints/auth.endpoint.service';
import { MerchantDetail } from '../../models/merchant-detail';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  showErrorMsg = false;
  error = '';
  // set the currenr year
  year: number = new Date().getFullYear();

  
  constructor(private formBuilder: FormBuilder,private authService:AuthService,
     private toastr: ToastrService, private _authEndpoints: AuthEndpoints, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userNameOrEmailAddress: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

  }

  get f() { return this.loginForm.controls; }


  onSubmit() {
    this.submitted = true;

    const loginData = {
      mobileNumber: this.f['userNameOrEmailAddress'].value,
      password: this.f['password'].value
    };

    if (this.loginForm.invalid) {
      return;
    } else {
      this._authEndpoints.postTokenAuthAuthenticate(loginData).subscribe(
         ( res:any) => {
debugger
          if(res.status)
         {  
          sessionStorage.setItem('access_token', res.data);
 
            this.authService.saveDetails(); 
 
          this.toastr.success( 'Login successfully', '', {
            timeOut: 5000,
            closeButton:true,
            progressBar :true,
            progressAnimation :"increasing"
          });
           this.router.navigate(['layout']);
         }
         else {

          this.toastr.error('Wrong username or password!', '', {
            timeOut: 5000,
            closeButton:true,
            progressBar :true,
            progressAnimation :"increasing"
          });
          return ;
         }

          },
          (error) => {
            this.showErrorMsg = true
            this.error = 'User Name Or Passwrod invalid';
            setTimeout(()=>{
              this.showErrorMsg = false;
          }, 3000);
          });


    }

  }

}
