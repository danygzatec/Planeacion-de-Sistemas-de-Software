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

  getTitle() : string[] {
    var title: string[] = [];
    var currString : string = "";

    this.request.forEach(req => {
      var e = this.employee.find(emp => emp.id_employee == req.id_emp_req);
      currString.concat(e!.employee_name);
      currString.concat("wants to ");
      if(req.type == 0){
        currString.concat( " add ");
      } else if(req.type == 1){
        currString.concat( " remove ");
      }

      e = this.employee.find(emp => emp.id_employee == req.id_emp_mod);

      currString.concat(e!.employee_name);
      console.log(currString.toString());
      title.push(currString);
      currString = "";
      
    });

    return title;
  }
}
