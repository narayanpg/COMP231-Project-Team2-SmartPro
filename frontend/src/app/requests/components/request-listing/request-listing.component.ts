import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Request } from '../../models/request';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-request-listing',
  templateUrl: './request-listing.component.html',
  styleUrls: ['./request-listing.component.scss']
})
export class RequestListingComponent implements OnInit {

  constructor(
    private requestService: RequestService,
    private jwtService: JwtService,
    // tslint:disable-next-line: align
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  dataSource: Request[] = [];

  ngOnInit() {
    if (this.isAdmin()) {
      this.requestService.getAllRequests().subscribe(
        data => {
          this.dataSource = data;
          console.log(data);
        },
        err => {
          this.errorHandler(err, 'Failed to fetch residents');
        }
      );
    } else {
      this.requestService.getRequestsByUser(this.getUserId()).subscribe(
        data => {
          this.dataSource = data;
          console.log(data);
        },
        err => {
          this.errorHandler(err, 'Failed to fetch residents');
        }
      );
    } // this.requestService.getRequestsByUser(this.getUserId()).subscribe(
  }
  private errorHandler(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
  saveBtnHandler() {
    this.router.navigate(['dashboard', 'requests', 'new']);
  }
  getUserId() {
    const userId = this.jwtService.getUserId();
    return userId;
  }
  isAdmin() {
    const what = this.jwtService.isAdmin();
    if (what) {
      return true;
    } else {
      return false;
    }
  }
  hasData() {
    if (DataSource.length > 1) {
      return true;
    } else {
      return false;
    }

  }

}
