import { Component, OnInit, Output,EventEmitter,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/shared/models/Note';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {

  result: Note;
  form: FormGroup;
  URLAPI = environment.urlApi;

  @Output() onSubmit: EventEmitter<Note | null>;


  constructor(
    public dialogRef: MatDialogRef<NoteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onSubmit = new EventEmitter<Note | null>();
    this.form = this.generateForm();
  }

  ngOnInit(): void {
  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.note?.id),
      note: new FormControl(this.data.note?.note),
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
