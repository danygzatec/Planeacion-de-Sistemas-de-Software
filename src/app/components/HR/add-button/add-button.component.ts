import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';
import { Project } from 'src/app/models/project';
import { HttpClient, HttpParams } from '@angular/common/http'
import { SqlService } from 'src/app/services/sql.service';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {

  public members : Employee[];
  public isChecked : Boolean[];
  public id_team: any;
  public isUnassigned: boolean;

  constructor(private sql: SqlService, private  dialogRef:  MatDialogRef<AddButtonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
      this.members = data.m;
      this.id_team = data.idT;
      this.isUnassigned = data.iU;
      this.isChecked = [];
      this.members.forEach(m => {
      this.isChecked.push(false)
    });
    }

  ngOnInit(): void {
    //console.log(this.members);
  }

  public addHR() {
    var employeesToAdd = this.getCheckedMembers();
    for (let i = 0; i < employeesToAdd.length; i++){
      if (!this.isUnassigned){
        const req = new HttpParams()
        .set('id_emp_mod', employeesToAdd[i].id)
        .set('id_team', this.id_team)
      //console.log(req);
        this.sql.postAddHR(req);
      } else{
        const req = new HttpParams()
        .set('id_emp_mod', employeesToAdd[i].id)
        .set('id_team', this.id_team)
      //console.log(req);
        this.sql.postAddUnassigned(req);
      }
      // console.log(employeesToAdd[i].id);
      // console.log(this.id_team);
      window.location.reload();
      
    }
    this.dialogRef.close();
  }

  hasMembers() {
    return this.members.length > 0;
  }

  checkMembers(memb: Employee) {
    var index = this.members.findIndex(m => m.id === memb.id);
    this.isChecked[index] = !this.isChecked[index];

  }

  getCheckedMembers() {
    var checkedMembers: Employee[] = [];

    var i = 0;
    this.members.forEach(element => {
      if (this.isChecked[i]) {
        checkedMembers.push(element);
      }
      i++;
    });

    return checkedMembers;

  }
}
