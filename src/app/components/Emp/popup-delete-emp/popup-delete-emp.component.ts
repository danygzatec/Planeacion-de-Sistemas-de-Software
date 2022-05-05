import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material/dialog';

@Component({
  selector: 'app-popup-delete-emp',
  templateUrl: './popup-delete-emp.component.html',
  styleUrls: ['./popup-delete-emp.component.css']
})
export class PopupDeleteEmpComponent implements OnInit {

  public member;
  public employee;

  constructor(
    private dialogRef: MatDialogRef<PopupDeleteEmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.member = data.m;
      this.employee = data.e;
     }

  ngOnInit(): void {
  }

  closeMe() {
    this.dialogRef.close();
  }

}
