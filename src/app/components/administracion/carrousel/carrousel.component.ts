import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Banner } from 'src/app/shared/models/Banner';
import { CarrouselService } from 'src/app/shared/services/carrousel.service';
import { MatDialog } from '@angular/material/dialog';
import { CarrouselFormularioComponent } from '../carrousel-formulario/carrousel-formulario.component';
import { DataFormularioCarrousel } from '../../../shared/dto/Carrousel/DataFormularioCarrousel';
import { Utils } from '../../../utils';
import { AddBannerResponse } from 'src/app/shared/dto/Carrousel/AgregarBannerResponse';
import { AddBannerRequest } from 'src/app/shared/dto/Carrousel/AgregarBannerRequest';
import { EditarBannerRequest } from 'src/app/shared/dto/Carrousel/EditarBannerRequest';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { BorrarBannerRequest } from 'src/app/shared/dto/Carrousel/BorrarBannerRequest';
import { BorrarBannerResponse } from 'src/app/shared/dto/Carrousel/BorrarBannerResponse';


@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css'],
})
export class CarrouselComponent implements OnInit {
  displayedColumns: string[] = ['titulo', 'desde', 'hasta', 'acciones'];
  dataSource!: MatTableDataSource<Banner>;
  accionFormulario:string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private carrouselService: CarrouselService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {}

  async ngOnInit() {
    await this.obtenerBanners();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Ítems por página';
  }

  async obtenerBanners() {
    const data = await this.carrouselService.obtenerBanners();
    this.dataSource = new MatTableDataSource(data);
  }

  onBuscar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClickAgregar() {
    this.accionFormulario = 'Crear';
    const dataForm: DataFormularioCarrousel = {
      accionFormulario: "Crear",
      banner: new Banner(null)
    };
    this.gestionarFormulario(dataForm);
    };

  onClickEditar(banner: any) {
    this.accionFormulario = 'Editar';
    const dataForm: DataFormularioCarrousel = {
      accionFormulario: "Editar",
      banner: banner
    };
    this.gestionarFormulario(dataForm);
  }

  async onClickBorrar(banner:any){
      if (await this.generarConfirmacion("Está a punto de eliminar un registro. ¿Está seguro de realizar esta operación?") === true) {
        await this.borrarBanner(banner);
        await this.obtenerBanners();
      }
  }

  async borrarBanner(banner: Banner) {
    const request: BorrarBannerRequest = {
      banner: banner
    }
    let resultado: BorrarBannerResponse;
      resultado = await this.carrouselService.borrar(request);
  }

  async generarConfirmacion(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  async gestionarFormulario(dataFormulario: DataFormularioCarrousel) {
    const dialogConfig = Utils.matDialogConfigPorDefecto();
    dialogConfig.data = dataFormulario;

    const dialogRef = this.dialog.open(CarrouselFormularioComponent, dialogConfig);
    const componentInstance = dialogRef.componentInstance;

    componentInstance.onSubmit.subscribe(async (datos) => {
      if (!datos) {
        dialogRef.close();
        return false;
      }

      let resultado: AddBannerResponse = await this.onSubmit(datos);

      if (!resultado.valido) {
        return false;
      }
      else {
        dialogRef.close();
        await this.obtenerBanners();
        return true;
      }
    })

  }

  async onSubmit(banner: Banner) : Promise<AddBannerResponse> { 
    let resultadoOperacion: AddBannerResponse;
    
    resultadoOperacion = this.accionFormulario == "Crear" ? await this.agregarBanner(banner) : await this.editarbanner(banner);
   
    return resultadoOperacion;
  }
  
  async agregarBanner(banner: Banner): Promise<AddBannerResponse> {
    const agregarBannerRequest: AddBannerRequest = {
      banner: banner
    }
    const resultado = await this.carrouselService.addBanner(agregarBannerRequest);
    return resultado;
  }

  async editarbanner(banner: Banner): Promise<AddBannerResponse> {
    const editarBannerRequest: EditarBannerRequest = {
      banner: banner
    }
    const resultado = await this.carrouselService.editarBanner(editarBannerRequest);
    return resultado;
  }


}
