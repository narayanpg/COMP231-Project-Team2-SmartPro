import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resident } from '../models/resident';
import { environment } from 'src/environments/environment';

// const BASE_URL = 'http://localhost:4445/api';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {
  constructor(private httpClient: HttpClient) {}
  getResidents(): Observable<Resident[]> {
    return this.httpClient.get<Resident[]>(`${environment.api_url}/residents`);
  }

  createResident(body: Resident): Observable<Resident> {
    return this.httpClient.post<Resident>(`${environment.api_url}/residents`, body);
  }
  deleteResident(id: string): Observable<Resident> {
    return this.httpClient.delete<Resident>(`${environment.api_url}/residents/${id}`);
  }
  getResident(id: string): Observable<Resident> {
    return this.httpClient.get<Resident>(`${environment.api_url}/residents/${id}`);
  }
  updateResident(id: string, body: Resident): Observable<Resident> {
    return this.httpClient.put<Resident>(`${environment.api_url}/residents/${id}`, body);
  }
}
