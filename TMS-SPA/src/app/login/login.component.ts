import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(private loginServices: LoginService, private alertify: AlertifyService,
     private router: Router) { }

  ngOnInit() {
  }
  login(model: any) {
    this.loginServices.login(this.model).subscribe(next => {
      this.alertify.success('logged in successfully');
    }, error => {
      this.alertify.error('login failed');
    }, () => {
      if (this.loginServices.decodedToken.role === 'admin') {
        this.router.navigate(['/admindashboard']);
      }
      if (this.loginServices.decodedToken.role === 'user') {
        this.router.navigate(['/userdashboard']);
      }
    }
    );
  }
}
