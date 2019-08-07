import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { UserDashboardService } from '../_services/user-dashboard.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  id: any;
  public tasks: ITask[];
  constructor(private userDashboardService: UserDashboardService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.getTaskAssignedToSpecificUser();
  }
  getTaskAssignedToSpecificUser() {
     this.id = this.loginService.decodedToken.nameid;
      this.userDashboardService.getTaskAssignedToSpecificUser(this.id).subscribe(resp => {
        this.tasks = resp as ITask[];
        console.log(this.tasks);
    });
  }
}
interface ITask {
  id: number;
  taskName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  assignedTo: number;
}
