import { Component, OnInit } from '@angular/core';
import { LoginService } from './_services/login.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  jwtHelper = new JwtHelperService();
  constructor(private loginService: LoginService) {}
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.loginService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
