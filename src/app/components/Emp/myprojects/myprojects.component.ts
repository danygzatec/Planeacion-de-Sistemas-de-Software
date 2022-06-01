import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Employee } from 'src/app/models/employee';
import { EmployeeProject } from 'src/app/models/employee-project';
import { Project } from 'src/app/models/project';
import ExcelData from 'src/excel-dummy.json'
import { ChartData, ChartType } from 'chart.js';
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

    // tenemos que hacer esto para que los doughnut charts muestren datos
    this.billableHours = this.getBillableHours();
    this.nonBillableHours = this.getNonBillableHours();

  }

  ngOnInit(): void {
    this.getEmployeeAPI();
    this.getEmpProjAPI();
    this.getProjectsAPI();
    this.createObjects();
  }

  getEmployeeAPI() {
    this.sql.getEmployees().subscribe((resp) => {
      this.employee = resp;
    })
  }

  getProjectsAPI() {
    this.sql.getProjects().subscribe((resp) => {
      this.projects = resp;
    })
  }

  getEmpProjAPI() {
    this.sql.getEmployeeProjects().subscribe((resp) => {
      this.empProject = resp;
    })
  }

  /* 
  En esta función creamos los objetos que están dentro de cada arreglo de Interfaces
  */
  createObjects() {

    this.getEmployeeAPI();
    this.getEmpProjAPI();
    this.getProjectsAPI();

    this.empProject.forEach(ep => {
      ep.project = [];
      var p = this.projects.find(pjct => pjct.id === ep.id_project);
      ep.project.push(p!);
      ep.employee = this.employee.find(emp => emp.id === ep.id_employee);
    });
  }

  getProjects() {
    var userProjects: Project[] = [];

    // buscamos al empleado que está signed in
    var e = this.employee.find(emp => emp.email === this.accountInfo.msalService.instance.getActiveAccount()!.username);
    console.log("projects ", e);

    // buscamos los proyectos en los que trabajó y que completó las horas
    this.empProject.forEach(element => {
      if (element.did_complete && element.id_employee === e!.id) {
        var id = element.id_project;
        var proj = this.projects.find(pjct => pjct.id === id);
        userProjects.push(proj!);
        console.log(proj);

        // asignar las labels a los doughnut charts
        this.doughnutChartDataB.labels!.push(proj!.project_name);
        this.doughnutChartDataNB.labels!.push(proj!.project_name);
      }
    })

    return userProjects;
  }

  getBillableHours() {

    var billHrs: number[] = [];

    // encontramos el empleado que está signed in
    var e = this.employee.find(emp => emp.email === this.accountInfo.msalService.instance.getActiveAccount()!.username);
    console.log(e);

    // buscamos los proyectos en los que trabajó
    this.empProject.forEach(element => {
      if (element.id_employee === e!.id) {
        billHrs.push(element.billHrs);
        console.log(element.billHrs);
        // asignamos valores en el dataset correspondiente de nuestro chart
        this.doughnutChartDataB.datasets[0].data.push(element.billHrs);
      }
    })

    return billHrs;

  }

  getNonBillableHours() {

    var nonbillHrs: any[] = [];

    // encontramos el empleado que está signed in
    var e = this.employee.find(emp => emp.email === this.accountInfo.msalService.instance.getActiveAccount()!.username);
    console.log(this.accountInfo.getEmailAccount());

    // buscamos los proyectos en los que trabajó
    this.empProject.forEach(element => {
      if (element.id_employee === e!.id) {
        nonbillHrs.push(element.nonbillHrs);
        // asignamos valores en el dataset correspondiente de nuestro chart
        this.doughnutChartDataNB.datasets[0].data.push(element.nonbillHrs);
      }
    })

    return nonbillHrs;

  }


}
