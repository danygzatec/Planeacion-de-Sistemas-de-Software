import { Component, OnInit } from '@angular/core';

import {
  formatDate
 }
  from '@angular/common';

  import {
    Inject,
    LOCALE_ID }
    from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // doughnut chart
  // billable
  public doughnutChartDataB: ChartData<'doughnut'> = {
    labels: ['Project1', 'Project2', 'Project3', 'Project4', 'Project5', 'Project6', 'Project7', 'Project8'],
    datasets: [
      { data: [50, 20, 30, 80, 23, 12, 54, 32] }
    ]
  };
  // non-billable
  public doughnutChartDataNB: ChartData<'doughnut'> = {
    labels: ['Project1', 'Project2', 'Project3', 'Project4', 'Project5', 'Project6', 'Project7', 'Project8'],
    datasets: [
      { data: [30, 50, 20, 50, 23, 67, 10, 48] }
    ]
  };
  // decimos que el chart type es tipo doughnut
  public doughnutChartType: ChartType = 'doughnut';

  //curr = formatDate(new Date(), 'dd/MM/yyyy' ,this.locale);
  curr = formatDate(new Date(), "MMM d, yyyy 'at' H:mm aa" ,this.locale);

  constructor( @Inject(LOCALE_ID) public locale: string, ) { }

  ngOnInit(): void {
    //console.log(this.current);
  }

}
