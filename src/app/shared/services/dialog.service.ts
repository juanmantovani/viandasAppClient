import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../components/mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogConfig: MatDialogConfig = {
    disableClose: true,
    autoFocus: true,
    width: '25%',
    panelClass: 'myconfirm-dialog-container',
    //position: { top: "150px" },
  };

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg: string): Promise<boolean> {
    this.dialogConfig.data = { message: msg };
    return this.dialog.open(MatConfirmDialogComponent, this.dialogConfig).afterClosed().toPromise();
  }
}
