import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdminDashboardService } from '../_services/admin-dashboard.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  UserTask: any = {};
  modalRef: BsModalRef;
  public allTaskList: ITaskUserView[];
  result: boolean;
  public allUsers: IUser[];
  addedTask: ITask;
  constructor(private modalService: BsModalService,
     private adminServices: AdminDashboardService, private alertify: AlertifyService) {
      this.getAllUsers();
  }

  ngOnInit() {
    this.getAllTaskList();
  }
  openTaskModal(template: TemplateRef<any>) {
    this.UserTask = {
      id: 0,
      TaskName: '',
      Description: '',
      StartDate: new Date,
      EndDate: new Date,
      AssignedTo: null
    };
    this.modalRef = this.modalService.show(template);
  }
  closeTaskModal() {
    this.modalRef.hide();
  }

  addTask(UserTask: any) {
    this.adminServices.addTask(this.UserTask).subscribe( resp => {
      this.addedTask = resp as ITask;
      this.getAllTaskList();
      this.closeTaskModal();
      this.alertify.success('Task added successfully');
    }, error => {
      this.alertify.error('Error occured while adding task');
    });
  }
  getAllTaskList() {
    this.adminServices.getAllTaskList().subscribe ( resp => {
      this.allTaskList = resp as ITaskUserView[];
    });
  }
  getAllUsers() {
    this.adminServices.getAllUsers().subscribe ( resp => {
      this.allUsers = resp as IUser[];
    });
  }
  editTask(t: ITaskUserView) {
    console.log(t);
  }
  deleteTask(t: ITaskUserView) {
    this.adminServices.deleteTask(t.id).subscribe(resp => {
       this.result = resp as boolean;
       if (this.result === true) {
          for (let i = 0; i < this.allTaskList.length; i++) {
            if (this.allTaskList[i].id === t.id) {
              this.allTaskList.splice(i, 1);
            }
          }
          this.alertify.success('Task deleted successfully');
       }
    });
  }
  editUser(u: IUser) {

  }
  deleteUser(u: IUser) {

  }
}

interface ITaskUserView {
  id: number;
  taskName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  assignedTo: number;
  assignedUser: string;
}
interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
  userRole: string;
}
interface ITask {
  id: number;
  taskName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  assignedTo: number;
}