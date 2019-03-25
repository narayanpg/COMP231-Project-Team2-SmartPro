import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resident } from '../models/resident';

const BASE_URL = 'http://localhost:4443/api';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {
  constructor(private httpClient: HttpClient) {}
  getResidents(): Observable<Resident[]> {
    return this.httpClient.get<Resident[]>(`${BASE_URL}/residents`);
  }

  createResident(body: Resident): Observable<Resident> {
    return this.httpClient.post<Resident>(`${BASE_URL}/residents`, body);
  }
  deleteResident(id: string): Observable<Resident> {
    return this.httpClient.delete<Resident>(`${BASE_URL}/residents/${id}`);
  }
  getResident(id: string): Observable<Resident> {
    return this.httpClient.get<Resident>(`${BASE_URL}/residents/${id}`);
  }
  updateResident(id: string, body: Resident): Observable<Resident> {
    return this.httpClient.put<Resident>(`${BASE_URL}/residents/${id}`, body);
  }
}
