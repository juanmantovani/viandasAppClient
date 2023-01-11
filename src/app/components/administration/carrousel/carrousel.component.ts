import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Banner } from 'src/app/shared/models/Banner';
import { CarrouselService } from 'src/app/shared/services/carrousel.service';
import { MatDialog } from '@angular/material/dialog';
import { CarrouselFormComponent } from '../carrousel-form/carrousel-form.component';
import { DataFormCarrousel } from '../../../shared/dto/carrousel/DataFormCarrousel';
import { Utils } from '../../../utils';
import { AddBannerResponse } from 'src/app/shared/dto/carrousel/AddBannerResponse';
import { AddBannerRequest } from 'src/app/shared/dto/carrousel/AddBannerRequest';
import { EditBannerRequest } from 'src/app/shared/dto/carrousel/EditBannerRequest';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { DeleteBannerRequest } from 'src/app/shared/dto/carrousel/DeleteBannerRequest';
import { EditBannerResponse } from 'src/app/shared/dto/carrousel/EditBannerResponse';
import { GetBannerResponse } from 'src/app/shared/dto/carrousel/GetBannerResponse';


@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css'],
})
export class CarrouselComponent implements OnInit {
  displayedColumns: string[] = ['title', 'start', 'end', 'actions'];
  dataSource: any;
  actionForm: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private carrouselService: CarrouselService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.getBanners();
    this.paginator._intl.itemsPerPageLabel = 'Ítems por página';
  }

  async getBanners() {
    await this.carrouselService.getBanners().subscribe((res: GetBannerResponse) => {
      this.dataSource = new MatTableDataSource(res.banners);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClickAdd() {
    this.actionForm = 'Add';
    const dataForm: DataFormCarrousel = {
      actionForm: "Add",
      banner: new Banner(null)
    };
    this.gestionateForm(dataForm);
  };

  onClickEdit(banner: any) {
    this.actionForm = 'Edit';
    const dataForm: DataFormCarrousel = {
      actionForm: "Edit",
      banner: banner
    };
    this.gestionateForm(dataForm);
  }

  async onClickDelete(banner: any) {
    if (await this.generateConfirm("Está a punto de eliminar un registro. ¿Está seguro de realizar esta operación?") === true) {
      await this.deleteBanner(banner);
    }
  }

  async deleteBanner(banner: Banner) {
    const request: DeleteBannerRequest = {
      idBanner: banner.id
    }
    await this.carrouselService.deleteBanner(request).subscribe(() => {
      this.getBanners();
    });
  }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  async gestionateForm(dataForm: DataFormCarrousel) {
    const dialogConfig = Utils.matDialogConfigDefault();
    dialogConfig.data = dataForm;

    const dialogRef = this.dialog.open(CarrouselFormComponent, dialogConfig);
    const componentInstance = dialogRef.componentInstance;

    componentInstance.onSubmit.subscribe(async (data) => {
      if (!data) {
        dialogRef.close();
        return false;
      }

      var result: any = await this.onSubmit(data);
      if (result) {
        return false;
      }
      else {
        dialogRef.close();
        await this.getBanners();
        return true;
      }
    })
  }

  async onSubmit(banner: Banner) {
    const resultOperation = this.actionForm == "Add" ? await this.addBanner(banner) : await this.editBanner(banner);

    return resultOperation;
  }

  async addBanner(banner: Banner) {
    const addBannerRequest: AddBannerRequest = {
      banner: banner
    }
    await this.carrouselService.addBanner(addBannerRequest).subscribe((res: AddBannerResponse) => {
      this.getBanners();
      return res;
    }

    );
  }

  async editBanner(banner: Banner) {
    const editBannerRequest: EditBannerRequest = {
      banner: banner
    }
    await this.carrouselService.editBanner(editBannerRequest).subscribe((res: EditBannerResponse) => {
      this.getBanners();
      return res;
    })
  }
}
