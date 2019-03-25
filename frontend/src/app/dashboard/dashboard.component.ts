import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: '<app-side-nav></app-side-nav>',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
