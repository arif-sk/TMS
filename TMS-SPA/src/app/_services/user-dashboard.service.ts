import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {
baseUrl: any = 'http://localhost:5000/Api/Task/';
constructor(private http: HttpClient) { }
getTaskAssignedToSpecificUser(id: any) {
  console.log(id);
  return this.http.get(this.baseUrl + 'GetAssignedTaskToSpecificUser/' + id);
}
}
