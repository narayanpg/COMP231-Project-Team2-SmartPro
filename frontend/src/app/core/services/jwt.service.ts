import * as jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor() { }

  setToken(token: string) {
    window.localStorage.setItem('jwt_token', token);
  }
  getToken() {
    return window.localStorage.getItem('jwt_token');
  }
  destroyToken() {
    window.localStorage.removeItem('jwt_token');
  }

  getUserId() {
    const token = window.localStorage.getItem('jwt_token');
    if (token) {
      const tokenInfo = jwt_decode(token); // decode token
      const userId = tokenInfo.id; // get userId
      return userId;
    }
  }
  getUserName() {
    const token = window.localStorage.getItem('jwt_token');
    if (token) {
      const tokenInfo = jwt_decode(token); // decode token
      const userName = tokenInfo.fullName; // get userId
      return userName;
    }
  }
  getUserDob() {
    const token = window.localStorage.getItem('jwt_token');
    if (token) {
      const tokenInfo = jwt_decode(token); // decode token
      const userDob = tokenInfo.dob; // get userId
      return userDob;
    }
  }
  getUserEmail() {
    const token = window.localStorage.getItem('jwt_token');
    if (token) {
      const tokenInfo = jwt_decode(token); // decode token
      const user = tokenInfo.email; // get userId
      return user;
    }
  }
  getUserAccessCode() {
    const token = window.localStorage.getItem('jwt_token');
    if (token) {
      const tokenInfo = jwt_decode(token); // decode token
      const user = tokenInfo.accessCode; // get userId
      return user;
    }
  }
  isAdmin() {
    // const token = window.localStorage.getItem('jwt_token');
    if (this.getUserName() === 'Narayan Guragain') {
      return true;
    } else {
      return false;
    }
  }

}
