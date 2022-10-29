import { Component, OnInit } from '@angular/core';
import { GetdataService } from './../../../services/getdata.service';
import { map } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { Delete, deleteDialog, openDialog } from 'src/functions/functions';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from 'src/app/pop-up/pop-up.component';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  title: string = table.Camiones.title;
  camiones$ = this.service.camiones$;
  displayedColumns: string[] = table.Camiones.columns;
  constructor(
    private service: GetdataService,
    private crud: CrudService,
    private dialog: MatDialog
  ){}
  ngOnInit(): void {
    localStorage.removeItem('add');
    if (this.crud.addCampo == true){
      this.crud.addCampo = false;
      return location.reload();
    }

  }
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.camiones$ = this.camiones$.pipe(
        map(camiones => camiones.filter((camion: {
          num_serie: any;
          placas: any;
          niv:any,
          id: any;
        }) => camion.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
        || camion.num_serie.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
        || camion.placas.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
        || camion.niv.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1)));
    }
  Refresh(){
    location.reload();
  }
  Delete(id:string){
    deleteDialog(id,this.crud,'camiones',this.dialog,PopUpComponent)
  }
  openDialog(id: string, url: string, title: string, table: string) {
    openDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
}

