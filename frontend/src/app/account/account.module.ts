import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListingComponent } from './components/account-listing/account-listing.component';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AccountListingComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
