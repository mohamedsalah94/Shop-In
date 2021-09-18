import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
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
import { TermsComponent } from './terms/terms.component';
import { ProductsComponent } from './products/products.component';

import { LocationStrategy , HashLocationStrategy } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './Interceptors/authentication.interceptor';
import { IndicatorInterceptor } from './Interceptors/indicator.interceptor';
import {ToastyModule} from 'ng2-toasty';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    HomeComponent,
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
    AllCategoriesComponent,
    ProfileComponent,
    EditProfileComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastyModule.forRoot()
  ],
  providers: [
    {provide:LocationStrategy,useClass:HashLocationStrategy},
    {provide:HTTP_INTERCEPTORS , useClass:AuthenticationInterceptor , multi:true},
    {provide:HTTP_INTERCEPTORS , useClass:IndicatorInterceptor , multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


