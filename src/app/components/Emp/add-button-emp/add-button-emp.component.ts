import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-add-button-emp',
  templateUrl: './add-button-emp.component.html',
  styleUrls: ['./add-button-emp.component.css']
})
export class AddButtonEmpComponent implements OnInit {

  public members : Employee[];

  constructor(private dialogRef: MatDialogRef<AddButtonEmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      this.members = data.m;
     }

  ngOnInit(): void {
  }

  public closeMe() {
    this.dialogRef.close();
  }

}
