import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
baseUrl: any = 'http://localhost:12381/api/Task/';
userBaseUrl: any = 'http://localhost:12381/api/User/';
id: number;
constructor(private http: HttpClient) { }
addTask(UserTask: any) {
  return this.http.post(this.baseUrl, UserTask);
}
getAllTaskList() {
  return this.http.get(this.baseUrl);
}
deleteTask(id: number) {
  return this.http.delete(this.baseUrl + id);
}
getAllUsers() {
  return this.http.get(this.userBaseUrl);
}
}
