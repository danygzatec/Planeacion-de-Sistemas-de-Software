import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material/dialog';


@Component({
  selector: 'app-popup-delete',
  templateUrl: './popup-delete.component.html',
  styleUrls: ['./popup-delete.component.css']
})
export class PopupDeleteComponent implements OnInit {

  public member;
  public employee;

  constructor(private dialogRef:  MatDialogRef<PopupDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.member = data.m;
    this.employee = data.e;
  }

   
  ngOnInit(): void {
  }

  closeMe() {
    this.dialogRef.close();
}

}
