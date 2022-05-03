import { Component, OnInit } from '@angular/core';

import {
  formatDate
 }
  from '@angular/common';

  import {
    Inject,
    LOCALE_ID }
    from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //curr = formatDate(new Date(), 'dd/MM/yyyy' ,this.locale);
  curr = formatDate(new Date(), "MMM d, yyyy 'at' H:mm aa" ,this.locale);

  constructor( @Inject(LOCALE_ID) public locale: string, ) { }

  ngOnInit(): void {
    //console.log(this.current);
  }

}
