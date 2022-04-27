import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {

  constructor(private  dialogRef:  MatDialogRef<AddButtonComponent>) { }

  ngOnInit(): void {
  }
  public  closeMe() {
    this.dialogRef.close();
  }
}
