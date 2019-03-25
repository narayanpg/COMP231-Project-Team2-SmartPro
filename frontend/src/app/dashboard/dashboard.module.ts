import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/material.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ResidentModule } from '../residents/residents.module';
import { StaffsModule } from '../staffs/staff.module';


@NgModule({
  declarations: [DashboardComponent, MainContentComponent, SideNavComponent, ToolbarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ResidentModule,
    StaffsModule,
    MaterialModule,
  ]
})
export class DashboardModule { }
