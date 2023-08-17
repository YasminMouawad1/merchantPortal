import { Component, OnInit } from '@angular/core'; 
import { LoaderService } from 'src/app/core/services/loader/loader.service';


LoaderService
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent{

  loading: boolean = true;

  constructor(private loaderService:LoaderService ) { 
  //   this.loaderService.isLoading.subscribe((v) => {
  //     setTimeout(() => {
  //       this.loading = v;
  //     }, 1500);     
  //   });
  // }
 
}
  

}
