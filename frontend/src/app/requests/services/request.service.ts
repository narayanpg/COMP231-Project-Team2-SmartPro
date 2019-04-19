import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../models/request';
import { User } from '../../core/models/user';
import { environment } from 'src/environments/environment';
import { JwtService } from 'src/app/core/services/jwt.service';

// const BASE_URL = 'http://localhost:4446/api';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private httpClient: HttpClient,
              private jwtService: JwtService) { }
  getAllRequests(): Observable<Request[]> {
    return this.httpClient.get<Request[]>(`${environment.api_url}/requests`);
  }
  getRequestsByUser(id: string): Observable<Request[]> {
    return this.httpClient.get<Request[]>(`${environment.api_url}/requests/byuser/${id}`);
  }
  createRequest(body: Request): Observable<Request> {
    return this.httpClient.post<Request>(`${environment.api_url}/requests`, body);
  }
  deleteRequest(id: string): Observable<Request> {
    return this.httpClient.delete<Request>(`${environment.api_url}/requests/${id}`);
  }
  updateRequest(id: string, body: Request): Observable<Request> {
    return this.httpClient.put<Request>(`${environment.api_url}/requests/${id}`, body);
  }
  getUserId() {
    const userId = this.jwtService.getUserId();
    return userId;
  }
}
