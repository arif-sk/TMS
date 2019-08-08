import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
baseUrl = environment.apiUrl + 'Task/';
userBaseUrl: any = environment.apiUrl + 'User/';
id: number;
constructor(private http: HttpClient) { }
addTask(UserTask: any) {
  console.log(UserTask);
  return this.http.post(this.baseUrl, UserTask);
}
updateTask(UserTask: any) {
  console.log(UserTask);
  return this.http.put(this.baseUrl + 'UpdateTask/' + UserTask.Id, UserTask, {
    headers: new HttpHeaders({
      'Accept' : '*/*'
    })
  });
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
addUser(model: any) {
  return this.http.post(this.userBaseUrl, model);
}
getUserListTypeUser() {
  return this.http.get(this.userBaseUrl + 'GetUserListTypeUser');
}
}
