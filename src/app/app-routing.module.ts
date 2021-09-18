import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { TermsComponent } from './terms/terms.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AdminDashboardGuard } from './Guards/admin-dashboard.guard';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:"full"},
  {path:'home', component: HomeComponent },
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'checkout', component: CheckoutComponent },
  {path:'terms',component:TermsComponent},
  {path:'products/:cat',component:ProductsComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:`contact-us`,component:ContactUsComponent},
  {path:`details/:id`,component:ProductDetailsComponent},
  {path:`wishlist`,component:WishlistComponent},
  {path:`shoppingCart`,component:ShoppingCartComponent},
  {path:`all-categories`,component:AllCategoriesComponent},
  {path:`profile`,component:ProfileComponent},
  {path:`edit-profile`,component:EditProfileComponent},
  {path: 'dashboard', canActivate:[AdminDashboardGuard] , loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {scrollPositionRestoration : "top" , useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
