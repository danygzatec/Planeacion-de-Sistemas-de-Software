import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { Request } from 'src/app/models/request'
import ExcelData from 'src/excel-dummy.json';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  public request: Request[];
  public employee: Employee[];

  searchText: any;

  constructor() {
    this.request = ExcelData.request;
    this.employee = ExcelData.employee;
   }

   async initializaObjects() {
     this.request = ExcelData.request;
     this.employee = ExcelData.employee;
   }

  async ngOnInit(): Promise<void> {
    await this.initializaObjects();
  }

  getRequest() {
    return this.request;
  }

  getTitle(requestID : number) : string {

    var currString : string = "";

    var r = this.request.find(req => req.id_request === requestID);
    var e = this.employee.find(emp => emp.id_employee === r!.id_emp_req);
    currString += e!.employee_name;
    currString += " wants to ";
    if(r!.type == 0){
      currString += " add ";
    } else if(r!.type == 1){
      currString += " remove ";
    }

    e = this.employee.find(emp => emp.id_employee == r!.id_emp_mod);

    currString += e!.employee_name;
    //console.log(currString);
    //console.log("hola");

    return currString;
      
  }

  countRequests(): number{
    return this.request.length;
  }
}
