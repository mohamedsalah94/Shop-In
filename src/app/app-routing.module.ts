import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {path:'',redirectTo:'',pathMatch:"full"},
  {path:'terms',component:TermsComponent},
  {path:'product',component:ProductsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
