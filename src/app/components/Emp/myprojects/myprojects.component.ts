import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Employee } from 'src/app/models/employee';
import { EmployeeProject } from 'src/app/models/employee-project';
import { Project } from 'src/app/models/project';
import ExcelData from 'src/excel-dummy.json'
import { ChartData, ChartType } from 'chart.js';

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

  constructor(public accountInfo: AppComponent) {
    this.projects = ExcelData.project;
    this.employee = ExcelData.employee;
    this.empProject = ExcelData.employee_project;

    // tenemos que hacer esto para que los doughnut charts muestren datos
    this.billableHours = this.getBillableHours();
    this.nonBillableHours = this.getNonBillableHours();

  }

  async ngOnInit(): Promise<void> {
    this.projects = ExcelData.project;
    this.employee = ExcelData.employee;
    this.empProject = ExcelData.employee_project;
    await this.createObjects();
  }

  /* 
  En esta función creamos los objetos que están dentro de cada arreglo de Interfaces
  */
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
    var userProjects: Project[] = [];

    // buscamos al empleado que está signed in
    var e = this.employee.find(emp => emp.employee_name === this.accountInfo.getNameAccount());

    // buscamos los proyectos en los que trabajó y que completó las horas
    this.empProject.forEach(element => {
      if (element.did_complete && element.id_employee === e!.id_employee) {
        var id = element.id_project;
        var proj = this.projects.find(pjct => pjct.id_project === id);
        userProjects.push(proj!);

        // asignar las labels a los doughnut charts
        this.doughnutChartDataB.labels!.push(proj!.project_name);
        this.doughnutChartDataNB.labels!.push(proj!.project_name);
      }
    })

    return userProjects;
  }

  getBillableHours() {

    var billHours: number[] = [];

    // encontramos el empleado que está signed in
    var e = this.employee.find(emp => emp.employee_name === this.accountInfo.getNameAccount());

    // buscamos los proyectos en los que trabajó
    this.empProject.forEach(element => {
      if (element.id_employee === e!.id_employee) {
        billHours.push(element.billableHours);
        // asignamos valores en el dataset correspondiente de nuestro chart
        this.doughnutChartDataB.datasets[0].data.push(element.billableHours);
      }
    })

    return billHours;

  }

  getNonBillableHours() {

    var nonBillHours: any[] = [];

    // encontramos el empleado que está signed in
    var e = this.employee.find(emp => emp.employee_name === this.accountInfo.getNameAccount());

    // buscamos los proyectos en los que trabajó
    this.empProject.forEach(element => {
      if (element.id_employee === e!.id_employee) {
        nonBillHours.push(element.nonBillableHours);
        // asignamos valores en el dataset correspondiente de nuestro chart
        this.doughnutChartDataNB.datasets[0].data.push(element.nonBillableHours);
      }
    })

    return nonBillHours;

  }


}
