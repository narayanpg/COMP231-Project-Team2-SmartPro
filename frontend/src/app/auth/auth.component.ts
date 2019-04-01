import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { JwtService } from '../core/services/jwt.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  authForm2: FormGroup;
  title = '';
  isResultsLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.initForm();
    this.initForm2();
    this.title = this.router.url === '/login' ? 'Login' : 'Signup';
  }
  onSubmit() {
    // console.log(this.authForm.value);
    if (this.title === 'Signup') {
      this.isResultsLoading = true;
      this.authService.signup(this.authForm.value)
        .subscribe(data => {
          console.log(data);
          this.router.navigate(['/dashboard', 'residents']);
        }, err => this.errorHandler(err, 'Opps, something went wrong'),
        () => this.isResultsLoading = false);
    } else {
      this.isResultsLoading = true;
      this.authService.login(this.authForm2.value).subscribe(
        data => {
          console.log(data);
          this.jwtService.setToken(data.token);
          this.router.navigate(['/dashboard', 'residents']);
        },
        err => this.errorHandler(err, 'Opps, something went wrong'),
        () => this.isResultsLoading = false);
    }

  }

  private initForm() {
    this.authForm = this.fb.group({
      unitNum: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  private initForm2() {
    this.authForm2 = this.fb.group({
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
