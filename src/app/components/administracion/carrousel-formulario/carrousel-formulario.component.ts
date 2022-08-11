import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Banner } from 'src/app/shared/models/Banner';

@Component({
  selector: 'app-carrousel-formulario',
  templateUrl: './carrousel-formulario.component.html',
  styleUrls: ['./carrousel-formulario.component.css'],
})
export class CarrouselFormularioComponent implements OnInit {
  result: Banner;
  formulario: FormGroup;
  minDateFechaHasta: Date;
  imagen: Blob;
  nombreImagen: string;

  title = 'dropzone';
  
    files: File[] = [];

  @Output() onSubmit: EventEmitter<Banner | null>;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<CarrouselFormularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onSubmit = new EventEmitter<Banner | null>();
    this.minDateFechaHasta = this.data?.fechaDesde
      ? this.data.fechaDesde
      : new Date();
      this.nombreImagen = '';
    this.formulario = this.generarFormulario();
  }

  ngOnInit(): void {}

  generarFormulario(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.banner?.id),
      titulo: new FormControl(
        this.data.banner?.titulo,
        Validators.required
      ),
      fechaDesde: new FormControl(
        this.data.banner?.fechaDesde,
        Validators.required
      ),
      fechaHasta: new FormControl(
        this.data.banner?.fechaHasta,
        Validators.required
      )
    });
  }

  onClickCancelar() {
    this.dialogRef.close();
  }
  onClickGuardar() {
    this.result = this.formulario.getRawValue();
    this.result.imagen = this.imagen;
    this.onSubmit.emit(this.result);
  }

  onChangeFechaDesde(e: any) {
    const date: Date = e?.value;
    if (date) this.minDateFechaHasta = date;
  }

    onSelect(event: any) {
      this.imagen = event.addedFiles[0];
    }

    onRemove(event : any) {
      this.imagen = new Blob();
  }
}
