import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
baseUrl: any = 'http://localhost:12381/api/Task/';
id: number;
constructor(private http: HttpClient) { }

getAllTaskList() {
  return this.http.get(this.baseUrl);
}
deleteTask(id: number) {
  return this.http.delete(this.baseUrl + id);
}
}
