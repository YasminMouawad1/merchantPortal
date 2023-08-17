import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthEndpoints } from 'src/app/shared/services/endpoints/auth.endpoint.service';
import { SpinnerService } from 'src/app/shared/services/endpoints/spinner.service';
import { UsersService } from 'src/app/shared/services/endpoints/users.service';
import Swal from 'sweetalert2';

import * as jspdf from 'jspdf';
import * as XLSX from 'xlsx'; 

import html2canvas from 'html2canvas';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

declare var $:any;
@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
  pendingList: any;

  checkedList: any[] = [];
  listID: number[] = [];

  usersList: any[] = [];
  merchantDueTransactions: any[] = [];
  merchantPaidTransactions: any[] = [];

  merchantTabCanceledTransactions: any[] = [];
  merchantPendingTransactions: any[] = [];
  merchantAllTransactions: any[] = [];

  debtRecordCodeList: any[] = [];
  getMerchantLoans: any = {};

  MerchantDetail:any = {}; 
  merchantLMCode :number = 0;
  spWarning:boolean = false;
  emptyMsg:boolean = false;

  countDebtRecordCode :number = 0;
  sumLoanAmount:number = 0;
  sumCommissionAmount:number = 0;
  sumMerchantDiscount:number = 0;
  sumAdminFee:number = 0;
  SumofMerchantDue:number = 0;
  dateNow = new Date();

 
  showSearchFiled:boolean = false;
  SearchTerm:string = '' ;
  
  showDownloadPDF:boolean = true;

  listName:string = 'dueList';
  disableExecl:boolean = false;

  disableconfirmBtn:boolean = false;
  
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  
  start:string = '';
  end:string = '';

  constructor(
    private toastr: ToastrService,
    private _userService: UsersService,
    private _spinnerService: SpinnerService,
    private router: Router,
    private modalService: NgbModal,
    private _sanitizer: DomSanitizer,
    private _authEndpoints: AuthEndpoints,
    private _authService:AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    
    this._authEndpoints.getMerchantDetails().subscribe(res => {
    
      this.MerchantDetail = res.data; 
     

      this.MerchantDetail.merchantLogo = 'data:image/jpg;base64,'+ this.MerchantDetail.merchantLogo;
 
      this.merchantLMCode = this.MerchantDetail.merchantLMCode;
    
      this.getMerchantAll();

      
    });
  
  this.disableconfirmBtn = false;
  }

  getMerchantAll() {
    debugger
    this._spinnerService.requestStarted();
 
    this._userService.getMerchantLoansById(this._authService.detilsValue.merchantCode).subscribe(
      (res) => {
        this.getMerchantLoans = res.data;  
        if(res.data == null)
        {
          this.emptyMsg = true;
          this._spinnerService.requestEnded();
          return ;
        }
 
 
        this.merchantDueTransactions = this.getMerchantLoans.loansModel.dueTransactions;
        this.merchantPendingTransactions = this.getMerchantLoans.loansModel.pendingTransactions;
        this.merchantTabCanceledTransactions = this.getMerchantLoans.loansModel.cancelledTransactions;
        this.merchantPaidTransactions = this.getMerchantLoans.loansModel.paidTransactions;
        debugger
        this.merchantAllTransactions = this.getMerchantLoans.loansModel.allTransactions;
 
        console.log(this.merchantTabCanceledTransactions)

        this._spinnerService.requestEnded();
      },
      (error) => {
        this._spinnerService.requestEnded();
      }
    );
    this._spinnerService.requestEnded();
  }

  getMerchant(isSelected: boolean, debtRecordCode: any) {
    debugger;

    if (isSelected) this.debtRecordCodeList.push(debtRecordCode);
    else {
      const index = this.debtRecordCodeList.indexOf(debtRecordCode);
      if (index > -1) {
        this.debtRecordCodeList.splice(index, 1);
      }
    }
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  confirm() {
    debugger;
    this.disableconfirmBtn = true;
    const data = { merchants: this.listID };

    this._userService.confirm(data).subscribe((res) => {
      if (res) {
        debugger
      // this.convetToPDF();
        this.toastr.success("",  'Saved successfully');


        setTimeout(()=>{
            window.location.reload()
             }, 3000);
      } else {
        this.spWarning = true;
        setTimeout(()=>{
             this.spWarning = false;
             }, 3000);
      }
    });



  }

  getCheckedItemList() {
    this.checkedList = [];
    this.listID = [];

    this.countDebtRecordCode  = 0;
    this.sumLoanAmount = 0;
    this.sumCommissionAmount = 0;
    this.sumMerchantDiscount = 0;
    this.sumAdminFee = 0;
    this.SumofMerchantDue = 0;

    for (var i = 0; i < this.merchantDueTransactions.length; i++) {
      if (this.merchantDueTransactions[i].isSelected) {
        debugger;
        this.checkedList.push(this.merchantDueTransactions[i]);
        this.listID.push(this.merchantDueTransactions[i].debtRecordCode);

        this.countDebtRecordCode ++;
        this.sumLoanAmount +=this.merchantDueTransactions[i].loanAmount;
        this.sumCommissionAmount +=this.merchantDueTransactions[i].merchantCommission;
        this.sumMerchantDiscount +=this.merchantDueTransactions[i].merchantDiscount;
        this.sumAdminFee +=this.merchantDueTransactions[i].adminFee;
        this.SumofMerchantDue +=this.merchantDueTransactions[i].merchantDue;


      }
    }
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

  showSearch(){
      this.showSearchFiled = true;  
      
  }
  
  hideSearch(){
    this.showSearchFiled = false; 
  }

  downloadPDF(){
    this.showDownloadPDF = false;
    this.convetToPDF();
  }

  exportexcel(){  
debugger
      let element = document.getElementById('allLsit');
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
      XLSX.writeFile(wb, 'TransactionsHistory.xlsx');
 
  }
 
  
}
