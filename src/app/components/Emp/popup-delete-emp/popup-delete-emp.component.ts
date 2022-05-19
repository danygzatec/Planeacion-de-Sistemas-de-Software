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
  motive="";

  public value = "Dear friend,";
  public maxlength = 250;
  public charachtersCount!: number;
  public counter!: string;

  constructor(
    private dialogRef: MatDialogRef<PopupDeleteEmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.member = data.m;
      this.employee = data.e;
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

}
