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
    this.formulario = this.generarFormulario();
  }

  ngOnInit(): void {}

  generarFormulario(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.data.bannerSeleccionado?.id),
      titulo: new FormControl(
        this.data.bannerSeleccionado?.titulo,
        Validators.required
      ),
      fechaDesde: new FormControl(
        this.data.bannerSeleccionado?.fechaDesde,
        Validators.required
      ),
      fechaHasta: new FormControl(
        this.data.bannerSeleccionado?.fechaHasta,
        Validators.required
      ),
    });
  }

  onClickCancelar() {
    this.dialogRef.close();
  }
  onClickAceptar() {
    console.log(this.formulario.getRawValue());
  }

  onChangeFechaDesde(e: any) {
    const date: Date = e?.value;
    if (date) this.minDateFechaHasta = date;
  }
}
