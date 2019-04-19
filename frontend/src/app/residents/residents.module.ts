import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidentListingComponent } from './components/resident-listing/resident-listing.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResidentFormComponent } from './components/resident-form/resident-form.component';

@NgModule({
  declarations: [ResidentListingComponent, ResidentFormComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [ResidentListingComponent],
})
export class ResidentModule { }
