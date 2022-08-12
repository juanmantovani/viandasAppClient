import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Banner } from 'src/app/shared/models/Banner';
import { CarrouselService } from 'src/app/shared/services/carrousel.service';
import { MatDialog } from '@angular/material/dialog';
import { CarrouselFormComponent } from '../carrousel-form/carrousel-form.component';
import { DataFormCarrousel } from '../../../shared/dto/Carrousel/DataFormularioCarrousel';
import { Utils } from '../../../utils';
import { AddBannerResponse } from 'src/app/shared/dto/Carrousel/AddBannerResponse';
import { AddBannerRequest } from 'src/app/shared/dto/Carrousel/AddBannerRequest';
import { EditBannerRequest } from 'src/app/shared/dto/Carrousel/EditBannerRequest';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { DeleteBannerRequest } from 'src/app/shared/dto/Carrousel/DeleteBannerRequest';
import { DeleteBannerResponse } from 'src/app/shared/dto/Carrousel/DeleteBannerResponse';
import { EditBannerResponse } from 'src/app/shared/dto/Carrousel/EditBannerResponse';


@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css'],
})
export class CarrouselComponent implements OnInit {
  displayedColumns: string[] = ['tittle', 'start', 'end', 'actions'];
  dataSource!: MatTableDataSource<Banner>;
  actionForm:string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private carrouselService: CarrouselService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {}

  async ngOnInit() {
    await this.getBanners();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Ítems por página';
  }

  async getBanners() {
    const data = await this.carrouselService.obtenerBanners();
    this.dataSource = new MatTableDataSource(data);
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClickAdd() {
    this.actionForm = 'Crear';
    const dataForm: DataFormCarrousel = {
      actionForm: "Crear",
      banner: new Banner(null)
    };
    this.gestionateForm(dataForm);
    };

  onClickEdit(banner: any) {
    this.actionForm = 'Editar';
    const dataForm: DataFormCarrousel = {
      actionForm: "Editar",
      banner: banner
    };
    this.gestionateForm(dataForm);
  }

  async onClickDelete(banner:any){
      if (await this.generateConfirm("Está a punto de eliminar un registro. ¿Está seguro de realizar esta operación?") === true) {
        await this.deleteBanner(banner);
        await this.getBanners();
      }
  }

  async deleteBanner(banner: Banner) {
    const request: DeleteBannerRequest = {
      banner: banner
    }
    const resultado = await this.carrouselService.deleteBanner(request);
  }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  async gestionateForm(dataFormulario: DataFormCarrousel) {
    const dialogConfig = Utils.matDialogConfigPorDefecto();
    dialogConfig.data = dataFormulario;

    const dialogRef = this.dialog.open(CarrouselFormComponent, dialogConfig);
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
        await this.getBanners();
        return true;
      }
    })

  }

  async onSubmit(banner: Banner) : Promise<AddBannerResponse> { 
    let resultadoOperacion: AddBannerResponse;
    
    resultadoOperacion = this.actionForm == "Crear" ? await this.agregarBanner(banner) : await this.editarbanner(banner);
   
    return resultadoOperacion;
  }
  
  async agregarBanner(banner: Banner): Promise<AddBannerResponse> {
    const agregarBannerRequest: AddBannerRequest = {
      banner: banner
    }
    const resultado = await this.carrouselService.addBanner(agregarBannerRequest);
    return new AddBannerResponse(resultado);
  }

  async editarbanner(banner: Banner): Promise<EditBannerResponse> {
    const editarBannerRequest: EditBannerRequest = {
      banner: banner
    }
    const resultado = await this.carrouselService.editBanner(editarBannerRequest);
    return new EditBannerResponse(resultado);
  }


}
