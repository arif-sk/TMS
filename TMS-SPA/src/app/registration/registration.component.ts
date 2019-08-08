import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../_services/register.service';
import { AlertifyService } from '../_services/alertify.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  model: any = {};
  constructor(public registerService: RegisterService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }
  register(model: any) {
    this.registerService.register(this.model).subscribe(() => {
      this.alertify.success('registration successful');
      this.router.navigate(['/login']);
    }, error => {
      this.alertify.error('registration failed');
    });
  }
}
