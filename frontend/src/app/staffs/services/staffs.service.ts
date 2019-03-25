import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from '../model/staff';

const BASE_URL = 'http://localhost:4443/api';

@Injectable({
  providedIn: 'root'
})
export class StaffsService {
  constructor(private httpClient: HttpClient) {}

  getStaffs(): Observable<Staff[]> {
    return this.httpClient.get<Staff[]>(`${BASE_URL}/staffs`);
  }
  createStaff(body: Staff): Observable<Staff> {
    return this.httpClient.post<Staff>(`${BASE_URL}/staffs`, body);
  }
  getStaff(id: string): Observable<Staff> {
    return this.httpClient.get<Staff>(`${BASE_URL}/staffs/${id}`);
  }

  updateStaff(id: string, body: Staff): Observable<Staff> {
    return this.httpClient.put<Staff>(`${BASE_URL}/staffs/${id}`, body);
  }
  deleteStaff(id: string): Observable<Staff> {
    return this.httpClient.delete<Staff>(`${BASE_URL}/staffs/${id}`);
  }
}
