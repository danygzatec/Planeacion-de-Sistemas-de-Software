import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';
import { AddMotivePopupComponent } from '../add-motive-popup/add-motive-popup.component';

@Component({
  selector: 'app-add-button-emp',
  templateUrl: './add-button-emp.component.html',
  styleUrls: ['./add-button-emp.component.css']
})
export class AddButtonEmpComponent implements OnInit {

  public members: Employee[];
  public isChecked: Boolean[];

  public employee: any;
  public team: any;

  constructor(private dialogRef : MatDialog, private dr : MatDialogRef<AddButtonEmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.members = data.m;
    this.employee = data.e;
    this.team = data.t;
    this.isChecked = [];
    this.members.forEach(m => {
      this.isChecked.push(false)
    });

  }

  ngOnInit(): void {
  }

  public closeMe() {
    this.dr.close();
  }

  checkMembers(memb: Employee) {
    var index = this.members.findIndex(m => m.id === memb.id);
    this.isChecked[index] = !this.isChecked[index];

  }

  hasMembers() {
    return this.members.length > 0;
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

  goToMotivePopUp(members : any, employee: any, team: any) {
    this.closeMe();
    this.dialogRef.open(AddMotivePopupComponent, {
      data: {
        m : members,
        e: employee,
        t: team
      }
    });
  }

}
