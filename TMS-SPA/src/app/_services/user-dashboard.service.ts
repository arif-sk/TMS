import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {
baseUrl = environment.apiUrl + 'Task/';
constructor(private http: HttpClient) { }
getTaskAssignedToSpecificUser(id: any) {
  console.log(id);
  return this.http.get(this.baseUrl + 'GetAssignedTaskToSpecificUser/' + id);
}
}
