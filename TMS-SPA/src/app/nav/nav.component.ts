import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public loginService: LoginService, private alertify: AlertifyService,
    private router: Router) { }
  ngOnInit() {
  }
  loggedIn() {
    return  this.loginService.loggedIn();
  }
  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/login']);
  }
}
