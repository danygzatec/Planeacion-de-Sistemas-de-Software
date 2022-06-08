import { Component, OnInit } from '@angular/core';

import {
  formatDate
}
  from '@angular/common';

import {
  Inject,
  LOCALE_ID
}
  from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { Employee } from 'src/app/models/employee';
import { Project } from 'src/app/models/project';
import { EmployeeProject } from 'src/app/models/employee-project';
import { SqlService } from 'src/app/services/sql.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projects: Project[];
  employee: Employee[];
  empProject: EmployeeProject[];
  billableHours: number[];
  nonBillableHours: number[];
  userProjects: Project[];
  hasData: boolean;
  hasDataTeams: boolean;
  allEmployees: Employee[];
  employeesWithTeam: number;
  employeesWithoutTeam: number;

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

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [] }
    ]
  };

  public barChartType: ChartType = 'bar';

  //curr = formatDate(new Date(), 'dd/MM/yyyy' ,this.locale);
  curr = formatDate(new Date(), "MMM d, yyyy 'at' H:mm aa", this.locale);

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    public sql: SqlService) {

    this.projects = [];
    this.employee = [];
    this.empProject = [];
    this.userProjects = [];
    this.allEmployees = [];
    this.employeesWithTeam = 0;
    this.employeesWithoutTeam = 0;

    this.billableHours = [];
    this.nonBillableHours = [];
    this.hasData = false;
    this.hasDataTeams = false;

  }

  ngOnInit(): void {
    this.getEmployeeAPI();
    this.getAllEmployees();
  }

  getEmployeeAPI() {
    this.sql.getEmployees().subscribe((resp) => {
      this.employee = resp;
      console.log(this.employee);
      this.getProjectsAPI(this.employee)
    })
  }

  getProjectsAPI(employee: Employee[]) {
    this.sql.getProjects().subscribe((resp) => {
      this.projects = resp;
      this.getEmpProjAPI(employee, this.projects);
    })
  }

  getEmpProjAPI(employee: Employee[], projects: Project[]) {
    this.sql.getEmployeeProjects().subscribe((resp) => {
      this.empProject = resp;

      this.createObjects(employee, projects, this.empProject);
    })
  }

  createObjects(employee: Employee[], projects: Project[], empProject: EmployeeProject[]) {

    empProject.forEach(ep => {
      ep.project = [];
      var p = projects.find(pjct => pjct.id === ep.id_project);
      ep.project.push(p!);
      ep.employee = employee.find(emp => emp.id === ep.id_employee);
    });

    this.getProjects(employee, projects, empProject);
  }

  getProjects(employee: Employee[], projects: Project[], empProject: EmployeeProject[]) {

    this.userProjects = [];

    // buscamos los proyectos en los que trabajó y que completó las horas
    empProject.forEach(element => {
      var p = this.userProjects.find(proj => proj.id === element.id_project)
      if (p === undefined) {
        var id = element.id_project;
        var proj = projects.find(pjct => pjct.id === id);
        this.userProjects.push(proj!);

        // asignar las labels a los doughnut charts
        this.doughnutChartDataB.labels!.push(proj!.project_name);
        this.doughnutChartDataNB.labels!.push(proj!.project_name);
      }
    })

    this.getBillableHours(empProject);
    this.getNonBillableHours(empProject);

    this.refreshHours();

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

    this.hasData = true;

  }

  getBillableHours(empProject: EmployeeProject[]) {

    var billHrs: number[] = [];
    var proj: Project[] = [];

    // buscamos los proyectos en los que trabajó
    empProject.forEach(element => {
      var p = proj.find(pj => pj.id === element.id_project);
      if (p === undefined) {
        p = this.projects.find(p => p.id === element.id_project);
        if (p !== undefined) {
          proj.push(p);
          billHrs.push(element.billHrs);

          // asignamos valores en el dataset correspondiente de nuestro chart
          this.doughnutChartDataB.datasets[0].data.push(element.billHrs);

        }
      }
    })

    this.billableHours = billHrs;

  }

  getNonBillableHours(empProject: EmployeeProject[]) {

    var nonbillHrs: any[] = [];

    var proj: Project[] = [];

    // buscamos los proyectos en los que trabajó
    empProject.forEach(element => {
      var p = proj.find(pj => pj.id === element.id_project);
      if (p === undefined) {
        p = this.projects.find(p => p.id === element.id_project);
        if (p !== undefined) {
          proj.push(p);
          nonbillHrs.push(element.nonBillHrs);

          // asignamos valores en el dataset correspondiente de nuestro chart
          this.doughnutChartDataNB.datasets[0].data.push(element.nonBillHrs);

        }
      }
    })

    this.nonBillableHours = nonbillHrs;
  }

  getAllEmployees() {

    this.sql.getAllEmployees().subscribe((resp) => {
      this.allEmployees = resp;

      this.getTeamRatios(this.allEmployees);

    })

  }

  getTeamRatios(allEmployees: Employee[]) {
    allEmployees.forEach(emp => {
      if (emp.is_assigned) {
        this.employeesWithTeam++;
      } else {
        this.employeesWithoutTeam++;
      }
    });

    this.barChartData.datasets[0].data.push(this.employeesWithTeam);
    this.barChartData.datasets[0].data.push(this.employeesWithoutTeam);

    this.barChartData.labels?.push("Employees with Team");
    this.barChartData.labels?.push("Unassigned Employees");

    this.refreshRatios();

  }

  refreshRatios() {

    this.barChartData.datasets[0].data = [];
    this.barChartData.labels = [];

    this.barChartData.datasets[0].data.push(this.employeesWithTeam);
    this.barChartData.datasets[0].data.push(this.employeesWithoutTeam);

    this.barChartData.labels?.push("Employees with Team");
    this.barChartData.labels?.push("Unassigned Employees");

    this.hasDataTeams = true;

  }

}
