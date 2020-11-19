import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SliderComponent } from './slider/slider.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { FooterComponent } from './footer/footer.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TermsComponent } from './terms/terms.component';
import { ProductsComponent } from './products/products.component';
import { LoadingpageComponent } from './loadingpage/loadingpage.component';





@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    HomeComponent,
    UserDashboardComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    NotfoundComponent,
    AboutusComponent,
    SliderComponent,
    HomeComponent,
    WishlistComponent,
    ShoppingCartComponent,
    FooterComponent,
    ProductDetailsComponent,
    ContactUsComponent,
    TermsComponent,
    ProductsComponent,
    LoadingpageComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


