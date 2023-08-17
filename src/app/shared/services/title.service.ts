import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TitleService {
   

    constructor() { 
    }

    sendData:BehaviorSubject<any> = new BehaviorSubject(null)
     
   
}
