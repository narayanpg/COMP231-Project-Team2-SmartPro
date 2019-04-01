import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ResidentListingComponent } from '../residents/components/resident-listing/resident-listing.component';
import { StaffListingComponent } from '../staffs/components/staff-listing/staff-listing.component';
import { ResidentFormComponent } from '../residents/components/resident-form/resident-form.component';
import { StaffFormComponent } from '../staffs/components/staff-form/staff-form.component';
import { AuthGuardService } from '../core/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'residents',
        component: ResidentListingComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'residents/new',
        component: ResidentFormComponent,
        canActivate: [AuthGuardService]

      },
      {
        path: 'residents/:id',
        component: ResidentFormComponent,
        canActivate: [AuthGuardService]

      },
      {
        path: 'staffs',
        component: StaffListingComponent,
        canActivate: [AuthGuardService]

      },
      {
        path: 'staffs/new',
        component: StaffFormComponent,
        canActivate: [AuthGuardService]

      },
      {
        path: 'staffs/:id',
        component: StaffFormComponent,
        canActivate: [AuthGuardService]

      },
      {
        path: '**',
        redirectTo: 'dashboard/residents'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
