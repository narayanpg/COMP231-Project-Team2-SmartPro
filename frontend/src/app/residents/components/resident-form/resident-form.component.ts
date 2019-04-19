import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-resident-form',
  templateUrl: './resident-form.component.html',
  styleUrls: ['./resident-form.component.scss']
})
export class ResidentFormComponent implements OnInit {
  // private resident: Resident;
  private user: User;
  residentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createForm();
    this.setUserToForm();
  }
  onSubmit() {
    if (this.user) {
      this.authService
        .updateUser(this.user._id, this.residentForm.value)
        .subscribe(
          data => {
            this.snackBar.open('Resident updated', 'Success', {
              duration: 2000
            });
            this.router.navigate(['dashboard', 'residents']);
          },
          err => this.errorHandler(err, 'Failed to update resident')
        );
    } else {
      this.authService.signup(this.residentForm.value)
        .subscribe(data => {
          this.snackBar.open('Resident created!', 'Success', {
            duration: 2000
          });
          this.residentForm.reset();
          console.log(data);
          this.router.navigate(['dashboard', 'residents']);
        }, err => this.errorHandler(err, 'Opps, something went wrong'));
    }
  }
  private setUserToForm() {
    // get the id of the user
    this.route.params.subscribe(params => {
      // tslint:disable-next-line: prefer-const
      let id = params.id;
      if (!id) {
        return;
      }
      this.authService.getUser(id).subscribe(
        user => {
          this.user = user;
          this.residentForm.patchValue(this.user);
        },
        err => this.errorHandler(err, 'Failed to get Resident')
      );
    });
  }
  private createForm() {
    this.residentForm = this.fb.group({
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
