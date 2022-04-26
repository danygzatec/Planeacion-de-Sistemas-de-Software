import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef } from  '@angular/material/dialog';

@Component({
  selector: 'app-popup-delete',
  templateUrl: './popup-delete.component.html',
  styleUrls: ['./popup-delete.component.css']
})
export class PopupDeleteComponent implements OnInit {

  constructor(private  dialogRef:  MatDialogRef<PopupDeleteComponent>) { }

  ngOnInit(): void {
  }

  public  closeMe() {
    this.dialogRef.close();
    console.log("hola");
}

}
