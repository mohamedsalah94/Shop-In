import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { AdminDashboardGuard } from '../Guards/admin-dashboard.guard';
import { SuperAdminDashboardGuard } from '../Guards/super-admin-dashboard.guard';
import { UpdateProductsComponent } from './update-products/update-products.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'add-products',canActivate:[AdminDashboardGuard], component: AddProductsComponent },
  { path: 'update-products/:id',canActivate:[AdminDashboardGuard], component: UpdateProductsComponent },

  // { path: 'users',canActivate:[SuperAdminDashboardGuard] , component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
