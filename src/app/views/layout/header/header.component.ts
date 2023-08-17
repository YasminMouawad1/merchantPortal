import { Component, OnInit } from '@angular/core';
import { TitleService } from './../../../shared/services/title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
 
  title:string = 'Selling statistics';
  
  
  public constructor(private _TitleService:TitleService) { 
     
   
  } 
 
  ngOnInit(): void {
    this._TitleService.sendData.subscribe({
      next:()=>{
        this.title = this._TitleService.sendData.getValue();
      }
    })
  }

}
