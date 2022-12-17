import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddPathologyRequest } from 'src/app/shared/dto/pathology/AddPathologyRequest';
import { AddPathologyResponse } from 'src/app/shared/dto/pathology/AddPathologyResponse';
import { DataFormPathology } from 'src/app/shared/dto/pathology/DataFormPathology';
import { DeletePathologyRequest } from 'src/app/shared/dto/pathology/DeletePathologyRequest';
import { EditPathologyRequest } from 'src/app/shared/dto/pathology/EditPathologyRequest';
import { EditPathologyResponse } from 'src/app/shared/dto/pathology/EditPathologyResponse';
import { GetPathologyResponse } from 'src/app/shared/dto/pathology/GetPathologyResponse';
import { Pathology } from 'src/app/shared/models/Pathology';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { PathologyService } from 'src/app/shared/services/pathology.service';
import { Utils } from 'src/app/utils';
import { PathologyFormComponent } from '../pathology-form/pathology-form.component';

@Component({
  selector: 'app-pathology',
  templateUrl: './pathology.component.html',
  styleUrls: ['./pathology.component.css']
})
export class PathologyComponent implements OnInit {
  displayedColumns: string[] = ['id','description', 'actions'];
  dataSource!: MatTableDataSource<Pathology>;
  actionForm: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private pathologyService: PathologyService,
    public dialog: MatDialog,
    private dialogService: DialogService) { 
      this.dataSource = new MatTableDataSource<Pathology>();

    }

    ngOnInit(): void {
      this.getPathologies();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = 'Ítems por página';
    }

    async getPathologies() {
      await this.pathologyService.getPathology().subscribe((res: GetPathologyResponse) => {
        this.dataSource = new MatTableDataSource(res.pathologies);
      })
    }

    onSearch(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    onClickAdd() {
      this.actionForm = 'Add';
      const dataForm: DataFormPathology = {
        actionForm: "Add",
        pathology: new Pathology(null),
      };
      this.gestionateForm(dataForm);
    }

    onClickEdit(Pathology: any) {
      this.actionForm = 'Edit';
      const dataForm: DataFormPathology = {
        actionForm: "Edit",
        pathology: Pathology,
  
      };
      this.gestionateForm(dataForm);
    }
  
    async onClickDelete(Pathology: any) {
      if (await this.generateConfirm("Está a punto de eliminar un registro. ¿Está seguro de realizar esta operación?") === true) {
        await this.deletePathology(Pathology);
      }
    }

    async deletePathology(pathology: Pathology) {
      const request: DeletePathologyRequest = {
        idPathology: pathology.id
      }
      await this.pathologyService.deletePathology(request).subscribe(() => {
        this.getPathologies();
      });
    }
  
    async generateConfirm(msg: string) {
      return await this.dialogService.openConfirmDialog(msg);
    }

    async gestionateForm(dataForm: DataFormPathology) {
      const dialogConfig = Utils.matDialogConfigDefault();
      dialogConfig.data = dataForm;
      const dialogRef = this.dialog.open(PathologyFormComponent, dialogConfig);
      const componentInstance = dialogRef.componentInstance;
  
      componentInstance.onSubmit.subscribe(async (data) => {
        if (!data) {
          dialogRef.close();
          return false;
        }
  
        var result : any  = await this.onSubmit(data);
        if (result) {
          return false;
        }
        else {
          dialogRef.close();
          await this.getPathologies();
          return true;
        }
      })
    }

    async onSubmit(pathology: Pathology){ 
      const resultOperation = this.actionForm == "Add" ? await this.addPathology(pathology) : await this.editPathology(pathology);
    
      return resultOperation;
    }
  
    async addPathology(pathology: Pathology) {
      const addPathologyRequest: AddPathologyRequest = {
        pathology: pathology
      }
  
      await this.pathologyService.addPathology(addPathologyRequest).subscribe((res: AddPathologyResponse) => {
        this.getPathologies()
        return res;
      }
      );
    }
  
    async editPathology(pathology: Pathology) {
      const editPathologyRequest: EditPathologyRequest = {
        pathology: pathology
      }
      await this.pathologyService.editPathology(editPathologyRequest).subscribe((res: EditPathologyResponse) => {
        this.getPathologies()
        return res;
      })
    }
  

}
