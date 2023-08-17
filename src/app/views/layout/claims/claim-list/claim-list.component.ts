import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UsersService } from 'src/app/shared/services/endpoints/users.service';
import { Observable } from 'rxjs';
import { AuthEndpoints } from 'src/app/shared/services/endpoints/auth.endpoint.service';
import { SpinnerService } from 'src/app/shared/services/endpoints/spinner.service';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.scss']
})
export class ClaimListComponent implements OnInit {

  open:boolean=false;

  claimRequestsForMerchantData: any[] = [];
  MerchantDetail:any= {};
  merchantLMCode :number = 0
  hideme: boolean[] = [];
  transitionCount:any[] = [];
  claimsAmount:any[] = [];
  dateNow = new Date();

  settledTransactions:any[]=[];
  canceledTransactions:any[]=[];
  deductedTransactions:any[]=[];
  
  totalDownPaymentAmountSetteled:number = 0;
  totalLoanAmountSetteled:number = 0;
  totalAdminFreeSetteled:number = 0;
  totalMerchantDiscountSettled:number = 0;
  totalMerchantCommisionSettled:number = 0;
  totalMerchantPromotionSettled:number = 0;
  totalMerchantDueSettled:number = 0;


  totalDownPaymentAmountDeducted:number = 0;
  totalLoanAmountDeducted:number = 0;
  totalAdminFreeDeducted:number = 0;
  totalMerchantDiscountDeducted:number = 0;
  totalMerchantCommisionDeducted:number = 0;
  totalMerchantPromotionDeducted:number = 0;
  totalMerchantDuededucted:number = 0;

  totalDownPaymentAmountCancel:number = 0;
  totalLoanAmountCancel:number = 0;
  totalAdminFreeCancel:number = 0;
  totalMerchantDiscountConcel:number = 0;
  totalMerchantCommisionConcel:number = 0;
  totalMerchantPromotionConcel:number = 0;
  totalMerchantDuecancel:number = 0;

  toalAmount:number = 0;
  SearchTerm:string = '' ;

  timeStamp:any;
  cliamNumber:any;

  constructor(private _userService: UsersService , private _sanitizer: DomSanitizer,private _authEndpoints: AuthEndpoints, private _spinnerService:SpinnerService) { }

  ngOnInit(){



    this._authEndpoints.getMerchantDetails().subscribe(res => {
      debugger
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
            //console.log(res.data)
           this._spinnerService.requestEnded();
          }


          for(let i = 0 ; i< this.claimRequestsForMerchantData.length ; i++){
            debugger
              this.transitionCount[i] =  this.claimRequestsForMerchantData[i].claimDetailsEntities.length;

              let sum = 0;

               for(let j = 0 ; j < this.claimRequestsForMerchantData[i].claimDetailsEntities.length; j++){
                  sum += this.claimRequestsForMerchantData[i].claimDetailsEntities[j].merchantDue;

               }
               this.claimsAmount[i] = sum;
            }
  

        }


      })
    });



    this._spinnerService.requestStarted();




  }

  show(){
    this.open = !this.open;
  }

  changeValue(i:number) {
    this.hideme[i] = !this.hideme[i];

  }

  claimPDF(claimNo:number){

    this.totalMerchantDueSettled = 0;
    this.totalMerchantDuecancel = 0;
    this.totalMerchantDuededucted = 0;

    this.totalDownPaymentAmountSetteled= 0;
    this.totalLoanAmountSetteled = 0;
    this.totalAdminFreeSetteled = 0; 
    this.totalMerchantDiscountSettled = 0;
    this.totalMerchantCommisionSettled = 0;
    this.totalMerchantPromotionSettled = 0;


    this.totalDownPaymentAmountDeducted = 0;
    this.totalLoanAmountDeducted = 0;
    this.totalAdminFreeDeducted = 0; 
    this.totalMerchantDiscountDeducted = 0;
    this.totalMerchantCommisionDeducted = 0;
    this.totalMerchantPromotionDeducted = 0;

    this.totalDownPaymentAmountCancel = 0;
    this.totalLoanAmountCancel = 0;
    this.totalAdminFreeCancel = 0; 
    this.totalMerchantDiscountConcel = 0;
    this.totalMerchantCommisionConcel = 0;
    this.totalMerchantPromotionConcel = 0;

    this.toalAmount = 0;

    this._userService.integrationClaimsPDF(claimNo,this.merchantLMCode).subscribe(res => {
      
     
      console.log(res)
      this.timeStamp = res.data.timeStamp;
      this.cliamNumber = res.data.cliamNumber;




      this.settledTransactions = res.data.requestClaimPDFModel.settledTransactions;
      this.canceledTransactions = res.data.requestClaimPDFModel.canceledTransactions;
      this.deductedTransactions = res.data.requestClaimPDFModel.deductedTransactions;


      for(let i = 0 ; i< this.settledTransactions.length ; i++){
        this.totalDownPaymentAmountSetteled += this.settledTransactions[i].downPaymentAmount;
        this.totalLoanAmountSetteled += this.settledTransactions[i].loanAmount;
        this.totalAdminFreeSetteled += this.settledTransactions[i].adminFee;
        this.totalMerchantDiscountSettled += this.settledTransactions[i].merchantDiscount;
        this.totalMerchantCommisionSettled += this.settledTransactions[i].merchantCommission;
        this.totalMerchantPromotionSettled += this.settledTransactions[i].merchantCommissionPromotion;
        this.totalMerchantDueSettled += this.settledTransactions[i].merchantDue;
      }

      for(let i = 0 ; i< this.canceledTransactions.length ; i++){
        this.totalDownPaymentAmountCancel += this.canceledTransactions[i].downPaymentAmount;
        this.totalLoanAmountCancel += this.canceledTransactions[i].loanAmount;
        this.totalAdminFreeCancel += this.canceledTransactions[i].adminFee;
        this.totalMerchantDiscountConcel += this.canceledTransactions[i].merchantDiscount;
        this.totalMerchantCommisionConcel += this.canceledTransactions[i].merchantCommission;
        this.totalMerchantPromotionConcel += this.canceledTransactions[i].merchantCommissionPromotion;
        this.totalMerchantDuecancel += this.canceledTransactions[i].merchantDue;
      }

      for(let i = 0 ; i< this.deductedTransactions.length ; i++){
        this.totalDownPaymentAmountDeducted += this.deductedTransactions[i].downPaymentAmount;
        this.totalLoanAmountDeducted += this.deductedTransactions[i].loanAmount;
        this.totalAdminFreeDeducted += this.deductedTransactions[i].adminFee;
        this.totalMerchantDiscountDeducted += this.deductedTransactions[i].merchantDiscount;
        this.totalMerchantCommisionDeducted += this.deductedTransactions[i].merchantCommission;
        this.totalMerchantPromotionDeducted += this.deductedTransactions[i].merchantCommissionPromotion;
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

     
    
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    //pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('المطالبة المالية.pdf');
    });

  }

}
