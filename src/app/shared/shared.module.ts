import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';

const sharedDeclarations: any[] | Type<any> = [
  LoaderComponent
];
const sharedImports: any[] | Type<any> = [
];

@NgModule({
  declarations: 
  [
    // sharedDeclarations
    LoaderComponent
  ],
  imports: [
    CommonModule, sharedImports
  ],
  exports: [
    // sharedDeclarations, sharedImports
    LoaderComponent,

  ]
})
export class SharedModule { }
