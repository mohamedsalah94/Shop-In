import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddProductsComponent } from './add-products/add-products.component';
import { UpdateProductsComponent } from './update-products/update-products.component';



@NgModule({
  declarations: [DashboardComponent, AddProductsComponent, UpdateProductsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})

export class DashboardModule { }
