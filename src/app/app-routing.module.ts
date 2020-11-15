import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutusComponent } from './aboutus/aboutus.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SliderComponent } from './slider/slider.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:"full"},
  {path:'aboutus',component:AboutusComponent},
  {path:'slider',component:SliderComponent},
  {path:'**',component:NotfoundComponent}


import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:"full"},
  {path:`contact-us`,component:ContactUsComponent},
  {path:`details`,component:ProductDetailsComponent},
  {path:`wishlist`,component:WishlistComponent},
  {path:`shoppingCart`,component:ShoppingCartComponent}  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
