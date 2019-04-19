import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { USE_VALUE } from '@angular/core/src/di/injector';
import { setDefaultService } from 'selenium-webdriver/opera';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {

  requestForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    // private residentService: ResidentService,
    // private authService: AuthService,
    private jwtService: JwtService,
    private requestService: RequestService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }
  onSubmit() {
    this.requestService.createRequest(this.requestForm.value)
      .subscribe(data => {
        this.snackBar.open('Request created!', 'Success', {
          duration: 2000
        });
        this.requestForm.reset();
        console.log(data);
        this.router.navigate(['dashboard', 'requests']);
      }, err => this.errorHandler(err, 'Opps, something went wrong'));
  }
  createForm() {
    this.requestForm = this.fb.group({
      topic: ['', Validators.required],
      message: ['', Validators.required],
      unit: ['', Validators.required],
      user: [this.getUserId(), Validators.required]
    });
  }
  private errorHandler(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
  getUserId() {
    const id = this.jwtService.getUserId();
    return id;
  }
}



