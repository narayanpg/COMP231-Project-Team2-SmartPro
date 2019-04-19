import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, LoginRsp, SignupRsp } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  login(body: User): Observable<LoginRsp> {
    return this.httpClient.post<LoginRsp>(
      `${environment.api_url}/users/login`,
      body
    );
  }
  signup(body: User): Observable<SignupRsp> {
    return this.httpClient.post<SignupRsp>(`${environment.api_url}/users/signup`, body);
  }
  deleteUser(id: string): Observable<User> {
    return this.httpClient.delete<User>(`${environment.api_url}/users/${id}`);
  }
  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${environment.api_url}/users/${id}`);
  }
  updateUser(id: string, body: User): Observable<User> {
    return this.httpClient.put<User>(`${environment.api_url}/users/${id}`, body);
  }
  getStaffs(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.api_url}/users/staffs`);
  }
  getResidents(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.api_url}/users/residents`);
  }
}
