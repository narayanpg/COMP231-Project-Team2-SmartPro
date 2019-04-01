import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResidentService } from '../../services/resident.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Resident } from '../../models/resident';

@Component({
  selector: 'app-resident-form',
  templateUrl: './resident-form.component.html',
  styleUrls: ['./resident-form.component.scss']
})
export class ResidentFormComponent implements OnInit {
  private resident: Resident;
  residentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private residentService: ResidentService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createForm();
    this.setInvoiceToForm();
  }
  onSubmit() {
    if (this.resident) {
      this.residentService
        .updateResident(this.resident._id, this.residentForm.value)
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
      this.residentService.createResident(this.residentForm.value).subscribe(
        data => {
          this.snackBar.open('Resident created!', 'Success', {
            duration: 2000
          });
          this.residentForm.reset();
          this.router.navigate(['dashboard', 'residents']);
        },
        err => this.errorHandler(err, 'Failed to create Resident')
      );
    }
  }
  private setInvoiceToForm() {
    // get the id of the resident
    this.route.params.subscribe(params => {
      // let id = params['id'];
      // tslint:disable-next-line: prefer-const
      let id = params.id;
      if (!id) {
        return;
      }
      this.residentService.getResident(id).subscribe(
        resident => {
          this.resident = resident;
          this.residentForm.patchValue(this.resident);
        },
        err => this.errorHandler(err, 'Failed to get Resident')
      );
    });
  }
  private createForm() {
    this.residentForm = this.fb.group({
      unit: ['', Validators.required],
      name: ['', Validators.required],
      livingSince: ['', Validators.required],
      email: ['', Validators.required],
      unitSharedWith: '',
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
