import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';    
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [ 
  { path: "", pathMatch: "full", redirectTo: "auth" },  

  { path: 'auth', loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule) },
  { path: 'layout', loadChildren: () => import('./views/layout/layout.module').then(m => m.LayoutModule) }, 
  {path:'**',component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
