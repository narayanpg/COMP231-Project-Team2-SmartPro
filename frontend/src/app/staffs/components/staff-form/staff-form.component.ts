import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaffsService } from '../../services/staffs.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Staff } from '../../model/staff';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent implements OnInit {
  private staff: Staff;
  staffForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private staffService: StaffsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createForm();
    this.setStaffToForm();
  }
  onSubmit() {
    if (this.staff) {
      this.staffService
        .updateStaff(this.staff._id, this.staffForm.value)
        .subscribe(
          data => {
            this.snackBar.open('Staff updated', 'Success', {
              duration: 2000
            });
            this.router.navigate(['dashboard', 'staffs']);
          },
          err => this.errorHandler(err, 'Failed to update staff')
        );
    } else {
      this.staffService.createStaff(this.staffForm.value).subscribe(
        data => {
          this.snackBar.open('Staff created!', 'Success', {
            duration: 2000
          });
          this.staffForm.reset();
          this.router.navigate(['dashboard', 'staffs']);
        },
        err => this.errorHandler(err, 'Failed to create Staff')
      );
    }
  }
  private setStaffToForm() {
    // get the id of the resident
    this.route.params.subscribe(params => {
      // let id = params['id'];
      // tslint:disable-next-line: prefer-const
      let id = params.id;
      if (!id) {
        return;
      }
      this.staffService.getStaff(id).subscribe(
        staff => {
          this.staff = staff;
          this.staffForm.patchValue(this.staff);
        },
        err => this.errorHandler(err, 'Failed to get Staff')
      );
    });
  }
  private createForm() {
    this.staffForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      workingSince: ['', Validators.required],
      email: ['', Validators.required],
      accessCode: ['', Validators.required]
    });
  }
  private errorHandler(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
