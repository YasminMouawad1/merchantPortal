import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from './../../../shared/services/endpoints/spinner.service';



@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  showSpinner:boolean= false;

  constructor(private _SpinnerService:SpinnerService, private _CdRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.init();
  }

init(){
  this._SpinnerService.getSpinnerObserver().subscribe((status) =>{
    if(status === 'start'){
      this.showSpinner = true;
    }
    else{
      this.showSpinner = false;
    }
    // status === 'start';
    // this.showSpinner = true;
    // setTimeout(() => {
    //   this.showSpinner = false
    // }, 2000);
    // this._CdRef.detectChanges();
  });


}


}
