import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Staff {
  id: string;
  name: string;
  healthcenter_id: string;
  role_id: string;
  created_at: string; 
  updated_at: string; 
  is_deleted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private apiUrl = `${environment.apiUrl}/staff`;

  constructor(private http: HttpClient) {}

  // Get all staff members
  getAllStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.apiUrl}`);
  }

  // Get a single staff member by ID
  getStaffById(id: string): Observable<Staff> {
    return this.http.get<Staff>(`${this.apiUrl}/${id}`);
  }

  // Create a new staff member
  createStaff(staff: Partial<Staff>): Observable<Staff> {
    return this.http.post<Staff>(this.apiUrl, staff);
  }

  // Update an existing staff member
  updateStaff(id: string, staff: Partial<Staff>): Observable<Staff> {
    return this.http.patch<Staff>(`${this.apiUrl}/${id}`, staff);
  }

  // Delete a staff member
  deleteStaff(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
