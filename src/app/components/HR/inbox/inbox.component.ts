import { Component, OnInit } from '@angular/core';
import { findIndex } from 'lodash';
import { Employee } from 'src/app/models/employee';
import { Request } from 'src/app/models/request';
import { HttpClient, HttpParams } from '@angular/common/http'
import { SqlService } from 'src/app/services/sql.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  public request: Request[];
  public employee: Employee[];
  lastRequestLength: number = 0;

  searchText: any;

  constructor(public sql: SqlService) {
    this.employee = [];
    this.request = [];
  }

  ngOnInit(): void {

    this.sql.getEmployees().subscribe((resp) => {
      this.employee = resp;
    })

    this.sql.getRequests().subscribe((resp) => {
      this.request = resp;
      this.lastRequestLength = resp.length;
    })

    //this.createObjects();

    setTimeout(() => { this.ngOnInit() }, 1000 * 5);

  }

  createObjects() {
    this.request.forEach(req => {

      var currString: string = "";

      var requested = this.employee.find(emp => req.id_emp_req === emp.id);
      var modified = this.employee.find(emp => req.id_emp_mod === emp.id);

      req.requestedBy = requested;
      req.employeeModified = modified

      if (req.title! === undefined) {
        currString += requested!.employee_name;
        currString += " wants to ";
        if (req.type == 0) {
          currString += "add ";
        } else if (req.type == 1) {
          currString += "remove ";
        }

        currString += modified!.employee_name;

        req.title = currString;
        console.log("dentro ", req.title);
      }

      console.log("fuera ", req.title);

    });

  }

  getTitle(reqID: number) {
    var r = this.request.find(req => req.id === reqID);
    return r!.title;
  }

  countRequests(): number {
  //   this.sql.getRequests().subscribe((resp) => {
  //     this.request = resp;
  //     this.lastRequestLength = resp.length;
  //   })
  //   console.log("count req",this.request);
    return this.request.length;
  }

  declineRequest(request: any){
    // console.log("request id", request.id);
    // console.log("id employee_teams", request.id_employee_teams);
    // console.log("type", request.type);
    const req = new HttpParams()
      .set('id_request', request.id)
      .set('id_employee_teams', request.id_employee_teams)
      .set('type', request.type);
    console.log(req);
    this.sql.postDeclineRequest(req);
  }

  acceptRequest(request: any){
    // console.log("request id", request.id);
    // console.log("id employee_teams", request.id_employee_teams);
    // console.log("type", request.type);
    const req = new HttpParams()
      .set('id_request', request.id)
      .set('id_employee_teams', request.id_employee_teams)
      .set('type', request.type);
    console.log(req);
    this.sql.postAcceptRequest(req);
  }
}
