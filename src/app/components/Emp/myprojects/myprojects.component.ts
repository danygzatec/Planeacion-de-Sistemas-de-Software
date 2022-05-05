import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Employee } from 'src/app/models/employee';
import { EmployeeProject } from 'src/app/models/employee-project';
import { Project } from 'src/app/models/project';
import ExcelData from 'src/excel-dummy.json'

@Component({
  selector: 'app-myprojects',
  templateUrl: './myprojects.component.html',
  styleUrls: ['./myprojects.component.css']
})
export class MyprojectsComponent implements OnInit {

  projects : Project[];
  employee : Employee[];
  empProject : EmployeeProject[];

  constructor(public accountInfo: AppComponent) { 
    this.projects = ExcelData.project;
    this.employee = ExcelData.employee;
    this.empProject = ExcelData.employee_project;
  }

  async ngOnInit(): Promise<void> {
    this.projects = ExcelData.project;
    this.employee = ExcelData.employee;
    this.empProject = ExcelData.employee_project;
    await this.createObjects();
  }

  async createObjects() {
    this.projects = ExcelData.project;
    this.employee = ExcelData.employee;
    this.empProject = ExcelData.employee_project;

    this.empProject.forEach(ep => {
      ep.project = [];
      var p = this.projects.find(pjct => pjct.id_project === ep.id_project);
      ep.project.push(p!);
      ep.employee = this.employee.find(emp => emp.id_employee === ep.id_employee);
    });
  }

  getProjects() {
    var userProjects : any[] = [];
    var e = this.employee.find(emp => emp.employee_name === this.accountInfo.getNameAccount());
    this.empProject.forEach(element => {
      if (element.did_complete && element.id_employee === e!.id_employee) {
        var id = element.id_project;
        userProjects.push(this.projects.find(pjct => pjct.id_project === id));
      }
    })

    console.log(userProjects);

    return userProjects;

  }

}
