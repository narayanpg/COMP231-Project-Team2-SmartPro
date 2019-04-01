import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from '../model/staff';
import { environment } from 'src/environments/environment';

// const BASE_URL = 'http://localhost:4446/api';

@Injectable({
  providedIn: 'root'
})
export class StaffsService {
  constructor(private httpClient: HttpClient) {}

  getStaffs(): Observable<Staff[]> {
    return this.httpClient.get<Staff[]>(`${environment.api_url}/staffs`);
  }
  createStaff(body: Staff): Observable<Staff> {
    return this.httpClient.post<Staff>(`${environment.api_url}/staffs`, body);
  }
  getStaff(id: string): Observable<Staff> {
    return this.httpClient.get<Staff>(`${environment.api_url}/staffs/${id}`);
  }

  updateStaff(id: string, body: Staff): Observable<Staff> {
    return this.httpClient.put<Staff>(`${environment.api_url}/staffs/${id}`, body);
  }
  deleteStaff(id: string): Observable<Staff> {
    return this.httpClient.delete<Staff>(`${environment.api_url}/staffs/${id}`);
  }
}
