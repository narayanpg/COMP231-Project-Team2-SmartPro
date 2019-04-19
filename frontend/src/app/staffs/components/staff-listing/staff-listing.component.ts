import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { remove } from 'lodash';
import { JwtService } from 'src/app/core/services/jwt.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-staff-listing',
  templateUrl: './staff-listing.component.html',
  styleUrls: ['./staff-listing.component.scss']
})
export class StaffListingComponent implements OnInit {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  displayedColumns = [
    'name',
    'dob',
    'email',
    'accessCode',
    'action'
  ];
  // tslint:disable-next-line: no-use-before-declare
  dataSource: User[] = [];

  saveBtnHandler() {
    this.router.navigate(['dashboard', 'staffs', 'new']);
  }

  // tslint:disable-next-line: comment-format
  updateBtnHandler(id) {
    this.router.navigate(['dashboard', 'staffs', id]);
  }

  deleteBtnHandler(id) {
    // tslint:disable-next-line: no-debugger
    this.authService.deleteUser(id).subscribe(
      data => {
        const removedItems = remove(this.dataSource, item => {
          return item._id === data._id;
        });
        this.dataSource = [...this.dataSource];
        this.snackBar.open('Staff deleted', 'Success');
        console.log(data);
      },
      err => {
        this.errorHandler(err, 'Failed to delete staff');
      }
    );
  }

  ngOnInit() {
    this.authService.getStaffs().subscribe(
      data => {
        this.dataSource = data;
        console.log(data);
      },
      err => {
        this.errorHandler(err, 'Failed to fetch staffs');
      }
    );
  }
  private errorHandler(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
  isLoggedIn() {
    const token = this.jwtService.getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  getUserName() {
    if (this.isLoggedIn()) {
      const user = this.jwtService.getUserName();
      return user;
    }
  }
  isAdmin() {
    if (this.isLoggedIn()) {
      if (this.getUserName() === 'Narayan Guragain') {
        return true;
      } else {
        return false;
      }
    }
  }
}
