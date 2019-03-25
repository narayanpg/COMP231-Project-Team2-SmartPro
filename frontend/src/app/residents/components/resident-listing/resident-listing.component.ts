import { Component, OnInit } from '@angular/core';
import { ResidentService } from '../../services/resident.service';
import { Resident } from '../../models/resident';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { remove } from 'lodash';

@Component({
  selector: 'app-resident-listing',
  templateUrl: './resident-listing.component.html',
  styleUrls: ['./resident-listing.component.scss']
})
export class ResidentListingComponent implements OnInit {
  constructor(
    private residentService: ResidentService,
    // tslint:disable-next-line: align
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  displayedColumns = [
    'unit',
    'name',
    'dob',
    'livingSince',
    'email',
    'unitSharedWith',
    'accessCode',
    'action'
  ];
  // tslint:disable-next-line: no-use-before-declare
  dataSource: Resident[] = [];

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
    this.residentService.deleteResident(id).subscribe(
      data => {
        const removedItems = remove(this.dataSource, item => {
          return item._id === data._id;
        });
        this.dataSource = [...this.dataSource];
        this.snackBar.open('Resident deleted', 'Success');
        console.log(data);
      },
      err => {
        this.errorHandler(err, 'Failed to delete resident');
      }
    );
  }

  ngOnInit() {
    this.residentService.getResidents().subscribe(
      data => {
        this.dataSource = data;
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
}
