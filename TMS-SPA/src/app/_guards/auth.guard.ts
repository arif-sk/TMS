import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../_services/login.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router,
    private alertfy: AlertifyService) {}
  canActivate():  boolean {
    if (this.loginService.loggedIn()) {
    return true;
    }
    this.alertfy.error('You shall not pass!!!');
    this.router.navigate(['/login']);
    return false;
  }
}