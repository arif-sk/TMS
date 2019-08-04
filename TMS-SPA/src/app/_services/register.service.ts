import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl = 'http://localhost:12381/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
constructor(private http: HttpClient) { }
register(model: any) {
  return this.http.post(this.baseUrl + 'register', model);
}
}
