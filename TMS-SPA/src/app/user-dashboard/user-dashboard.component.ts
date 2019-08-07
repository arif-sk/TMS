import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../_services/admin-dashboard.service';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private adminService: AdminDashboardService,
    private loginService: LoginService) { }

  ngOnInit() {
  }
  getTaskAssignedToSpecificUser() {
    let emil = this.loginService.decodedToken.unique_name;
  }
}
