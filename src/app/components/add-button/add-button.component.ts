import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {

  public members : Employee[];

  constructor(private  dialogRef:  MatDialogRef<AddButtonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
      this.members = data.m;
    }

  ngOnInit(): void {
  }

  public  closeMe() {
    this.dialogRef.close();
  }
}
