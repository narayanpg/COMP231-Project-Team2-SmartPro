import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ResidentListingComponent } from '../residents/components/resident-listing/resident-listing.component';
import { StaffListingComponent } from '../staffs/components/staff-listing/staff-listing.component';
import { ResidentFormComponent } from '../residents/components/resident-form/resident-form.component';
import { StaffFormComponent } from '../staffs/components/staff-form/staff-form.component';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { AdminGuardService } from '../core/services/admin-guard.service';
import { RequestListingComponent } from '../requests/components/request-listing/request-listing.component';
import { RequestFormComponent } from '../requests/components/request-form/request-form.component';
import { AccountListingComponent } from '../account/components/account-listing/account-listing.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'residents',
        component: ResidentListingComponent,
        canActivate: [AuthGuardService, AdminGuardService]
      },
      {
        path: 'residents/new',
        component: ResidentFormComponent,
        canActivate: [AuthGuardService, AdminGuardService]

      },
      {
        path: 'residents/:id',
        component: ResidentFormComponent,
        canActivate: [AuthGuardService, AdminGuardService]

      },
      {
        path: 'staffs',
        component: StaffListingComponent,
        canActivate: [AuthGuardService, AdminGuardService]

      },
      {
        path: 'staffs/new',
        component: StaffFormComponent,
        canActivate: [AuthGuardService, AdminGuardService]

      },
      {
        path: 'staffs/:id',
        component: StaffFormComponent,
        canActivate: [AuthGuardService, AdminGuardService]

      },
      {
        path: 'requests',
        component: RequestListingComponent,
        canActivate: [AuthGuardService]

      },
      {
        path: 'requests/new',
        component: RequestFormComponent,
        canActivate: [AuthGuardService]

      },
      {
        path: 'account',
        component: AccountListingComponent,
        canActivate: [AuthGuardService]

      },
      {
        path: '**',
        redirectTo: 'dashboard/account'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
