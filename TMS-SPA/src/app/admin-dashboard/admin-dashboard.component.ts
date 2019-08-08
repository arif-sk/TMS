import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdminDashboardService } from '../_services/admin-dashboard.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('usermodal') userModal: TemplateRef<any>;
  @ViewChild('taskmodal') taskModal: TemplateRef<any>;

  UserTask: any = {};
  modalRef: BsModalRef;
  public allTaskList: ITaskUserView[];
  result: boolean;
  public allUsers: IUser[];
  addedTask: ITask;
  updatedTask: ITask;
  model: any = {};
  addedUser: IUser;
  taskModalTitle: any;
  btnSaveUpdateTest: any;
  usersTypeUser: IUser[];
  showDirectionLinks = true;

  constructor(private modalService: BsModalService,
     private adminServices: AdminDashboardService, private alertify: AlertifyService) {
  }

  ngOnInit() {
    this.getAllTaskList();
    this.getUserListTypeUser();
    this.getAllUsers();
  }
  openTModal() {
    this.UserTask = {
      Id: 0,
      TaskName: '',
      Description: '',
      StartDate: new Date,
      EndDate: new Date,
      AssignedTo: ''
    };
    this.taskModalTitle = 'Add Task';
    this.btnSaveUpdateTest = 'Save';
    this.getUserListTypeUser();
    this.openTaskModal(this.taskModal);
  }
  openUModal() {
    this.model = {
      Id: 0,
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      ConfirmPassword: '',
      Mobile: '',
      Address: ''
    };
    this.openUserModal(this.userModal);
  }
  openTaskModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openUserModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closeTaskModal() {
    this.modalRef.hide();
  }
  closeUserModal() {
    this.modalRef.hide();
  }

  addTask(UserTask: any) {
    if (this.UserTask.Id === 0) {
      this.adminServices.addTask(this.UserTask).subscribe( resp => {
        this.addedTask = resp as ITask;
        this.getAllTaskList();
        this.closeTaskModal();
        this.alertify.success('Task added successfully');
      }, error => {
        this.alertify.error('Error occured while adding task');
      });
    } else {
        this.adminServices.updateTask(this.UserTask).subscribe(resp => {
        this.updatedTask = resp as ITask;
        this.getAllTaskList();
        this.closeTaskModal();
        this.alertify.success('Task updated successfuly');
      }, error => {
        this.alertify.error('Error occured while updating task');
      }
      );
    }
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
    this.taskModalTitle = 'Update Task';
    this.btnSaveUpdateTest = 'Update';
    this.openTaskModal(this.taskModal);
    this.UserTask = {
      Id: t.id,
      TaskName: t.taskName,
      Description: t.description,
      StartDate: new Date(t.startDate),
      EndDate: new Date(t.endDate),
      AssignedTo: t.assignedTo
    };
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
  addUser(model: any) {
      this.adminServices.addUser(this.model).subscribe( resp => {
        this.addedUser = resp as IUser;
        this.getAllUsers();
        this.closeUserModal();
        this.alertify.success('User added successfully');
      }, error => {
        this.alertify.error('Error occured while adding task');
      });
}
getUserListTypeUser () {
  this.adminServices.getUserListTypeUser().subscribe( resp => {
    this.usersTypeUser = resp as IUser[];
  });
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
