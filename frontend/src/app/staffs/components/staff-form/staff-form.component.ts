import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent implements OnInit {
  private staff: User;
  staffForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createForm();
    this.setStaffToForm();
  }
  onSubmit() {
    if (this.staff) {
      this.authService
        .updateUser(this.staff._id, this.staffForm.value)
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
      this.authService.signup(this.staffForm.value).subscribe(
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
// tslint:disable-next-line: prefer-const
      let id = params.id;
      if (!id) {
        return;
      }
      this.authService.getUser(id).subscribe(
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
      unitNum: ['', Validators.required],
      accessCode: ['', Validators.required],
      fullName: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  private errorHandler(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}
