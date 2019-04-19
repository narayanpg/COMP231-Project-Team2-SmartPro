import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { User } from 'src/app/core/models/user';


@Component({
  selector: 'app-account-listing',
  templateUrl: './account-listing.component.html',
  styleUrls: ['./account-listing.component.scss']
})
export class AccountListingComponent implements OnInit {

  constructor(private authService: AuthService,
              private jwtService: JwtService) { }

  user: User;
  ngOnInit() {
  }
  getUserId() {
    const user = this.jwtService.getUserId();
    return user;
  }
  getUserName() {
    const userid = this.jwtService.getUserName();
    return userid;
  }
  getUserEmail() {
    const userid = this.jwtService.getUserEmail();
    return userid;
  }
  getUserAccessCode() {
    const userid = this.jwtService.getUserAccessCode();
    return userid;
  }
  getDob() {
    const userid = this.jwtService.getUserDob();
    return userid;
  }
  getUser() {
    const userid = this.jwtService.getUserId();
    const user = this.authService.getUser(userid);
    return user;
  }

}
