import { Component, OnInit, Output,EventEmitter,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pathology } from 'src/app/shared/models/Pathology';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pathology-form',
  templateUrl: './pathology-form.component.html',
  styleUrls: ['./pathology-form.component.css']
})
export class PathologyFormComponent implements OnInit {
  result: Pathology;
  form: FormGroup;
  URLAPI = environment.urlApi;

  @Output() onSubmit: EventEmitter<Pathology | null>;


  constructor(
    public dialogRef: MatDialogRef<PathologyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onSubmit = new EventEmitter<Pathology | null>();
    this.form = this.generateForm();
  }

  ngOnInit(): void {
  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.category?.id),
      description: new FormControl(this.data.category?.description),
    });
  }

  onClickCancel() {
    this.dialogRef.close();
  }
  onClickSave() {
    this.result = this.form.getRawValue();
    this.onSubmit.emit(this.result);
  }
}
