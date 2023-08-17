import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { AuthEndpoints } from 'src/app/shared/services/endpoints/auth.endpoint.service';
import { SpinnerService } from 'src/app/shared/services/endpoints/spinner.service';
import { UsersService } from 'src/app/shared/services/endpoints/users.service';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  MerchantDetail:any; 
  merchantLMCode :number = 0
  totalTransactions:number = 0;
  amountTransactions:number = 0;
  amountPendingTransactions:number = 0;
  netAmountTransactions:number = 0;
  settledTransactions:number= 0;
  dailyTransactions:number = 0;

  daliyTransactionList:any[]=[];
  transitionCount:any[] = [];
  claimsAmount:any[] = [];
  hideme: boolean[] = [];

  claimRequestsForMerchantData: any[] = [];

  settledTransactionsg:any[]=[];
  canceledTransactions:any[]=[];
  deductedTransactions:any[]=[];
  totalMerchantDueSettled:number = 0;
  totalMerchantDuededucted:number = 0;
  totalMerchantDuecancel:number = 0;
  toalAmount:number = 0;

  

constructor(private _AuthEndpoints:AuthEndpoints , private _spinnerService:SpinnerService,
  private _userService: UsersService,  private _authService:AuthService){

       
 }

  ngOnInit(): void {

    this._userService.getMerchantLoansById(this._authService.detilsValue.merchantCode).subscribe(
      (res) => { 
             this.totalTransactions = res.data.totalNumberOfTransactions;
             this.amountPendingTransactions = res.data.totalAmountOfPendingTransactions;
             this.settledTransactions = res.data.totalAmountOfSettledTransactions;
            this.amountTransactions = res.data.totalAmountOfTransactions;
            this.netAmountTransactions = res.data.totalNetAmountOfTransactions;
            this.dailyTransactions = res.data.dailyTransactions;
      });

    


    this._AuthEndpoints.getMerchantDetails().subscribe(res => {
      this.MerchantDetail = res.data;
      this.merchantLMCode = this.MerchantDetail.merchantLMCode;
      this.MerchantDetail.merchantLogo = 'data:image/jpg;base64,'+ this.MerchantDetail.merchantLogo;

      this._userService.claimRequestsForMerchant(this.merchantLMCode).subscribe(res => {


        if(res.data == null){
            this._spinnerService.requestEnded();
            return ;
        }
        else{
          if(!Array.isArray(res.data)){
            this.claimRequestsForMerchantData.push(res.data);
            this._spinnerService.requestEnded();
          }

          else{
           this.claimRequestsForMerchantData = res.data;
           this._spinnerService.requestEnded();
          }
 

          for(let i = 0 ; i< this.claimRequestsForMerchantData.length ; i++){
              this.transitionCount[i] =  this.claimRequestsForMerchantData[i].claimDetailsEntities.length;
              
              let sum = 0;

               for(let j = 0 ; j < this.claimRequestsForMerchantData[i].claimDetailsEntities.length; j++){
                  sum += this.claimRequestsForMerchantData[i].claimDetailsEntities[j].totalAmount;
               
               }
               this.claimsAmount[i] = sum; 
            }
  
            
        }


      });
      });
    
      
  }

  changeValue(i:number) {
    this.hideme[i] = !this.hideme[i];

  }

  claimPDF(claimNo:number){
    
    this.totalMerchantDueSettled = 0;
    this.totalMerchantDuecancel = 0;
    this.totalMerchantDuededucted = 0;
    this.toalAmount = 0;

    this._userService.integrationClaimsPDF(claimNo,this.merchantLMCode).subscribe(res => {
      
      this.settledTransactionsg = res.data.requestClaimPDFModel.settledTransactions;
      this.canceledTransactions = res.data.requestClaimPDFModel.canceledTransactions;
      this.deductedTransactions = res.data.requestClaimPDFModel.deductedTransactions;

      for(let i = 0 ; i< this.settledTransactionsg.length ; i++){
        this.totalMerchantDueSettled += this.settledTransactionsg[i].merchantDue;
      }

      for(let i = 0 ; i< this.canceledTransactions.length ; i++){
        this.totalMerchantDuecancel += this.canceledTransactions[i].merchantDue;
      }

      for(let i = 0 ; i< this.deductedTransactions.length ; i++){
        this.totalMerchantDuededucted += this.deductedTransactions[i].merchantDue;
      }

      this.toalAmount = this.totalMerchantDueSettled - this.totalMerchantDuededucted;
 
    });
  }

  convetToPDF()
  {


    var data = document.getElementById('filePdfTransaction')!;


    html2canvas(data).then(canvas => {
 
    // Few necessary setting options
    var imgWidth = 208;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;

    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf.jsPDF('p', 'mm', 'a4');
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('المطالبة المالية.pdf');
    });

  }
}
