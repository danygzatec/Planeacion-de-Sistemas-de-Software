import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Employee } from 'src/app/models/employee';
import { EmployeeProject } from 'src/app/models/employee-project';
import { Project } from 'src/app/models/project';
import { Chart, ChartData, ChartType } from 'chart.js';
import { SqlService } from 'src/app/services/sql.service';

@Component({
  selector: 'app-myprojects',
  templateUrl: './myprojects.component.html',
  styleUrls: ['./myprojects.component.css']
})
export class MyprojectsComponent implements OnInit {
  projects: Project[];
  employee: Employee[];
  empProject: EmployeeProject[];
  billableHours: number[];
  nonBillableHours: number[];
  userProjects : Project[];
  hasData : boolean;

  searchText: any;

  // doughnut chart
  // billable
  public doughnutChartDataB: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      { data: [] }
    ]
  };
  // non-billable
  public doughnutChartDataNB: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      { data: [] }
    ]
  };
  // decimos que el chart type es tipo doughnut
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    public accountInfo: AppComponent,
    private sql: SqlService
    ) {
    this.projects = [];
    this.employee = [];
    this.empProject = [];
    this.userProjects = [];

    this.billableHours = [];
    this.nonBillableHours = [];
    this.hasData = false;

  }

  ngOnInit(): void {
    this.getEmployeeAPI();
  }

  getEmployeeAPI() {
    this.sql.getAllEmployees().subscribe((resp) => {
      this.employee = resp;
      //console.log(this.employee);
      this.getProjectsAPI(this.employee)
    })
  }

  getProjectsAPI(employee : Employee[]) {
    this.sql.getProjects().subscribe((resp) => {
      this.projects = resp;
      //console.log(this.projects);
      this.getEmpProjAPI(employee, this.projects);
    })
  }

  getEmpProjAPI(employee : Employee[], projects : Project[]) {
    this.sql.getEmployeeProjects().subscribe((resp) => {
      this.empProject = resp;
      console.log(this.empProject);
      this.createObjects(employee, projects, this.empProject);
    })
  }

  /* 
  En esta función creamos los objetos que están dentro de cada arreglo de Interfaces
  */
  createObjects(employee : Employee[], projects : Project[], empProject : EmployeeProject[]) {

    empProject.forEach(ep => {
      ep.project = [];
      var p = projects.find(pjct => pjct.id === ep.id_project);
      ep.project.push(p!);
      ep.employee = employee.find(emp => emp.id === ep.id_employee);
    });

    this.getProjects(employee, projects, empProject);
  }

  getProjects(employee : Employee[], projects : Project[], empProject : EmployeeProject[]) {

    this.userProjects = [];

    // buscamos al empleado que está signed in
    var e = employee.find(emp => emp.email === this.accountInfo.msalService.instance.getActiveAccount()!.username);
    console.log("EMPLOYEE " , e);

    // buscamos los proyectos en los que trabajó y que completó las horas
    empProject.forEach(element => {
      var p = this.userProjects.find(pjct => pjct.id === element.id);
      //if (element.did_complete && element.id_employee === e!.id) {
      if (element.id_employee === e!.id && p == undefined) {
        var id = element.id_project;
        var proj = projects.find(pjct => pjct.id === id);
        this.userProjects.push(proj!);

        // asignar las labels a los doughnut charts
        this.doughnutChartDataB.labels!.push(proj!.project_name);
        this.doughnutChartDataNB.labels!.push(proj!.project_name);
      }
    })

    this.getBillableHours(employee, empProject);
    this.getNonBillableHours(employee, empProject);

  }

  refreshHours() {

    this.doughnutChartDataB.datasets[0].data = [];
    this.doughnutChartDataNB.datasets[0].data = [];
    this.doughnutChartDataB.labels = [];
    this.doughnutChartDataNB.labels = [];

    this.billableHours.forEach(h => {
      this.doughnutChartDataB.datasets[0].data.push(h);
    });

    this.nonBillableHours.forEach(h => {
      this.doughnutChartDataNB.datasets[0].data.push(h);
    })

    this.userProjects.forEach(p => {
      this.doughnutChartDataB.labels!.push(p.project_name);
      this.doughnutChartDataNB.labels!.push(p.project_name);
    }) 

    console.log(this.doughnutChartDataB.datasets[0].data);
    console.log(this.doughnutChartDataB.labels)
    console.log(this.doughnutChartDataNB.datasets[0].data);
    console.log(this.doughnutChartDataNB.labels)

    this.hasData = true;

  }

  getBillableHours(employee : Employee[], empProject : EmployeeProject[]) {

    var billHrs: number[] = [];

    // encontramos el empleado que está signed in
    var e = employee.find(emp => emp.email === this.accountInfo.msalService.instance.getActiveAccount()!.username);

    // buscamos los proyectos en los que trabajó
    empProject.forEach(element => {
      if (element.id_employee === e!.id) {
        billHrs.push(element.billHrs);
        // asignamos valores en el dataset correspondiente de nuestro chart
        this.doughnutChartDataB.datasets[0].data.push(element.billHrs);
      }
    })

    this.billableHours = billHrs;

  }

  getNonBillableHours(employee : Employee[], empProject : EmployeeProject[]) {

    var nonbillHrs: any[] = [];

    // encontramos el empleado que está signed in
    var e = employee.find(emp => emp.email === this.accountInfo.msalService.instance.getActiveAccount()!.username);

    // buscamos los proyectos en los que trabajó
    empProject.forEach(element => {
      if (element.id_employee === e!.id) {
        nonbillHrs.push(element.nonBillHrs);
        // asignamos valores en el dataset correspondiente de nuestro chart
        this.doughnutChartDataNB.datasets[0].data.push(element.nonBillHrs);
      }
    })

    this.nonBillableHours = nonbillHrs;

    this.refreshHours();

  }


}
