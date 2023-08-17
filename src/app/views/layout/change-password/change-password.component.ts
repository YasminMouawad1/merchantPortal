import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { AuthEndpoints } from 'src/app/shared/services/endpoints/auth.endpoint.service';
import { UsersService } from 'src/app/shared/services/endpoints/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePassowrdForm!: FormGroup;
  submitted = false;
  showErrorMsg = false;
  error = '';
  // set the currenr year
  year: number = new Date().getFullYear();

  mobileNum:string = '';
  disableBtnChange:boolean = false;
  
  constructor(private formBuilder: FormBuilder,private authService:AuthService,
    private _usersService:UsersService,
     private toastr: ToastrService, private _authEndpoints: AuthEndpoints, private router: Router) { }

  ngOnInit(): void {
    this.changePassowrdForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword:['', [Validators.required]] 
    });


    this._authEndpoints.getMerchantDetails().subscribe(res =>{
      console.log(res)
      this.mobileNum = res.data.mobileNumber
    })
  }

  get f() { return this.changePassowrdForm.controls; }


  onSubmit() {
    this.submitted = true;
  this.disableBtnChange = true;
    const Data = { 
      password: this.f['password'].value,
      newPassword: this.f['newPassword'].value, 
      confirmPassword: this.f['confirmPassword'].value,
      arName: "",
      enName: "",
      mobileNumber:this.mobileNum,
      branchPhoneNumber:"",
      merchantCode:"",
      merchantLogo:""
      }
    

    if (this.changePassowrdForm.invalid) {
      return;
    } else {
      console.log(Data)
      this._usersService.changePassword(Data).subscribe(
         ( res:any) => {
          if(res.status){
              this.toastr.success( 'change password successfully', '', {
              timeOut: 5000,
              closeButton:true,
              progressBar :true,
              progressAnimation :"increasing"
            });
            this.router.navigate(['layout/dashboard']);
          }else{
            this.toastr.error( res.message)
          }
            
         }
         
         );
    }

    this.disableBtnChange = false;
  }



}
