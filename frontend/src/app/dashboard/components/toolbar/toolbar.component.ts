import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JwtService } from 'src/app/core/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private jwtService: JwtService,
              private router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.jwtService.destroyToken();
    this.router.navigate(['/login']);
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
      if (this.jwtService.isAdmin()) {
        return true;
      } else {
        return false;
      }
    }
  }

}
