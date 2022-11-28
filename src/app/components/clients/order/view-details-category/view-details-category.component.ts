import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderCategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-view-details-category',
  templateUrl: './view-details-category.component.html',
  styleUrls: ['./view-details-category.component.css']
})
export class ViewDetailsCategoryComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) 
    { }

  ngOnInit(): void {
  }

  onClickCancel() {
    this.dialogRef.close();
  }

}
