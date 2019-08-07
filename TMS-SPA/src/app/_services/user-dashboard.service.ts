import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { emit } from 'cluster';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {
baseUrl: any = 'http://localhost:12381/api/Task/';
constructor(private http: HttpClient) { }
  getAssignedTaskToSpecificUser(email: any){
    return this.http.get(this.baseUrl + 'GetAssignedTaskToSpecificUser', email);
  }

}
