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
  task: any = {};
  modalRef: BsModalRef;
  public allTaskList: ITaskUserView[];
  result: boolean;
  constructor(private modalService: BsModalService,
     private adminServices: AdminDashboardService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getAllTaskList();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addTask(task: any) {

  }
  getAllTaskList() {
    this.adminServices.getAllTaskList().subscribe ( resp => {
      this.allTaskList = resp as ITaskUserView[];
      console.log(this.allTaskList);
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
