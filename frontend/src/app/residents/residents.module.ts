import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidentListingComponent } from './components/resident-listing/resident-listing.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResidentService } from './services/resident.service';
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
  providers: [ResidentService]
})
export class ResidentModule {}
