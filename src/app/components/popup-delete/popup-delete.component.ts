import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from  '@angular/material/dialog';

@Component({
  selector: 'app-popup-delete',
  templateUrl: './popup-delete.component.html',
  styleUrls: ['./popup-delete.component.css']
})
export class PopupDeleteComponent implements OnInit {

  constructor(private dialogRef:  MatDialogRef<PopupDeleteComponent>) { }

  ngOnInit(): void {
  }

  closeMe() {
    this.dialogRef.close();
}

}
