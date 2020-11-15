import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

import { ProductsComponent } from './products/products.component';
import { TermsComponent } from './terms/terms.component';
import { LoadingpageComponent } from './loadingpage/loadingpage.component';

import { NotfoundComponent } from './notfound/notfound.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SliderComponent } from './slider/slider.component';

import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { FooterComponent } from './footer/footer.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AppComponent,

    CheckoutComponent,
    HomeComponent,
    UserDashboardComponent

    ProductsComponent,
    TermsComponent,
    LoadingpageComponent

    NotfoundComponent,
    AboutusComponent,
    SliderComponent

    HomeComponent,
    WishlistComponent,
    ShoppingCartComponent,
    FooterComponent,
    ProductDetailsComponent,
    ContactUsComponent


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


