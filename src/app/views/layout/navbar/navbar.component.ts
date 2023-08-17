import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { AuthEndpoints } from 'src/app/shared/services/endpoints/auth.endpoint.service';
import { TitleService } from 'src/app/shared/services/title.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 
  isLogin:boolean = false;
  userInfo:any={};
  MerchantDetail:any = {};
  //imagePath="assets/images/store.png";
  merchantName=""


  constructor(private _TitleService:TitleService,private _authEndpoints: AuthEndpoints, private authService:AuthService,
    private _router:Router) { 
 
  } 



  ngOnInit(): void {

    
    this._authEndpoints.getMerchantDetails().subscribe(res => {
      this.MerchantDetail = res.data; 
         
      this.MerchantDetail.merchantLogo = 'data:image/jpg;base64,'+ this.MerchantDetail.merchantLogo;
         

          this.merchantName = this.MerchantDetail.merchantName
    });

  }

  changeNavigation(e:any):void {
    this._TitleService.sendData.next(e.target.innerHTML)
  }

  logout(){
    this._authEndpoints.logout();
  }

  changePassword(){
    this._router.navigate(['layout/change-password']);
  }
}
