import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [{
  path: '',
  component: AppComponent
}, {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  }, {
    path: '**',
    redirectTo: 'dashboard',
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
