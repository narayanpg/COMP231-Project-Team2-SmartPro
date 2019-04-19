import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { remove } from 'lodash';
import { JwtService } from 'src/app/core/services/jwt.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-resident-listing',
  templateUrl: './resident-listing.component.html',
  styleUrls: ['./resident-listing.component.scss']
})
export class ResidentListingComponent implements OnInit {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  displayedColumns = [
    'unitNum',
    'accessCode',
    'fullName',
    'dob',
    'email',
    'action'
  ];
  // tslint:disable-next-line: no-use-before-declare
  dataSource2: User[] = [];

  saveBtnHandler() {
    this.router.navigate(['dashboard', 'residents', 'new']);
  }

  // tslint:disable-next-line: comment-format
  //editBtnHandler(id) {
  updateBtnHandler(id) {
    this.router.navigate(['dashboard', 'residents', id]);
  }

  deleteBtnHandler(id) {
    // tslint:disable-next-line: no-debugger
    this.authService.deleteUser(id).subscribe(
      data => {
        const removedItems = remove(this.dataSource2, item => {
          return item._id === data._id;
        });
        this.dataSource2 = [...this.dataSource2];
        this.snackBar.open('Resident deleted', 'Success');
        console.log(data);
      },
      err => {
        this.errorHandler(err, 'Failed to delete resident');
      }
    );
  }

  ngOnInit() {
    this.authService.getResidents().subscribe(
      data => {
        this.dataSource2 = data;
        console.log(data);
      },
      err => {
        this.errorHandler(err, 'Failed to fetch residents');
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
