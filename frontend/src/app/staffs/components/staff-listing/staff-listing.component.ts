import { Component, OnInit } from '@angular/core';
import { StaffsService } from '../../services/staffs.service';
import { Staff } from '../../model/staff';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { remove } from 'lodash';

@Component({
  selector: 'app-staff-listing',
  templateUrl: './staff-listing.component.html',
  styleUrls: ['./staff-listing.component.scss']
})
export class StaffListingComponent implements OnInit {
  constructor(
    private staffService: StaffsService,
    // tslint:disable-next-line: align
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  displayedColumns = [
    'name',
    'dob',
    'workingSince',
    'email',
    'accessCode',
    'action'
  ];
  // tslint:disable-next-line: no-use-before-declare
  dataSource: Staff[] = [];

  saveBtnHandler() {
    this.router.navigate(['dashboard', 'staffs', 'new']);
  }

  // tslint:disable-next-line: comment-format
  //editBtnHandler(id) {
  updateBtnHandler(id) {
    this.router.navigate(['dashboard', 'staffs', id]);
  }

  deleteBtnHandler(id) {
    // tslint:disable-next-line: no-debugger
    this.staffService.deleteStaff(id).subscribe(
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
    this.staffService.getStaffs().subscribe(
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
}
