import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestListingComponent } from './components/request-listing/request-listing.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [RequestListingComponent, RequestFormComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class RequestsModule { }
