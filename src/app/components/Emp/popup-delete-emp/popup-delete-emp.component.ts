import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http'
import { SqlService } from 'src/app/services/sql.service';

@Component({
  selector: 'app-popup-delete-emp',
  templateUrl: './popup-delete-emp.component.html',
  styleUrls: ['./popup-delete-emp.component.css']
})
export class PopupDeleteEmpComponent implements OnInit {

  public member;
  public employee;
  public employee_teams;
  motive="";

  public value = "Dear friend,";
  public maxlength = 250;
  public charachtersCount!: number;
  public counter!: string;

  constructor(private sql: SqlService,
    private dialogRef: MatDialogRef<PopupDeleteEmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.member = data.m;
      this.employee = data.e;
      this.employee_teams = data.idET;
     }

  ngOnInit(): void {
    this.charachtersCount = this.value ? this.value.length : 0;
    this.counter = `${this.charachtersCount}/${this.maxlength}`;
  }

  closeMe() {
    this.dialogRef.close();
  }

  public onValueChange(ev: string): void {
    this.charachtersCount = ev.length;
    this.counter = `${this.charachtersCount}/${this.maxlength}`;
  }

  removeRequest() {
    
      var createTitle = "";
      //console.log("member id", this.employee_teams.id_employee);
      //console.log("id employee_teams", this.employee_teams.id);
      console.log("employee", this.employee);
      const req = new HttpParams()
        .set('motive', this.motive)
        .set('id_emp_mod', this.employee_teams.id_employee)
        .set('type', 1)
        .set('id_emp_req', 681) // FALTA PONER EL ID DEL QUE ESTA LOGGED IN
        .set('status', 2)
        .set('title', "EMPLEADO QUE HIZO REQUEST wants to remove " + this.employee)
        .set('id_employee_teams',this.employee_teams.id);
      console.log(req);
      this.sql.postReqRemove(req);
    this.dialogRef.close();
    

}

}