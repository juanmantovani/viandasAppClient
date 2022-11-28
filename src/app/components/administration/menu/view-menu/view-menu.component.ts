import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListMenuComponent } from '../list-menu/list-menu.component';

@Component({
  selector: 'app-view-menu',
  templateUrl: './view-menu.component.html',
  styleUrls: ['./view-menu.component.css']
})
export class ViewMenuComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ListMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

    ) { }

  ngOnInit(): void {
  }

  onClickCancel() {
    this.dialogRef.close();
  }


}
