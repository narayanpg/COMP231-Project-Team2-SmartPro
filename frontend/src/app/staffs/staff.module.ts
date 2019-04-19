import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffListingComponent } from './components/staff-listing/staff-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { StaffFormComponent } from './components/staff-form/staff-form.component';

@NgModule({
  declarations: [StaffListingComponent, StaffFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [StaffListingComponent],
})
export class StaffsModule {}
