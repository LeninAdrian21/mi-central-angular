import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { PopUpComponent } from 'src/app/pop-up/pop-up.component';
import { CrudService } from 'src/app/services/crud.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { deleteDialog, openDialog } from 'src/functions/functions';
import { table } from 'src/functions/table';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  title: string = table.Lotes.title;
  lotes$ = this.service.lotes$;
  displayedColumns: string[] = table.Lotes.columns;
  constructor(
    private service: GetdataService,
    private crud: CrudService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.crud.addCampo == true) {
      this.crud.addCampo = false;
      return location.reload();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lotes$ = this.lotes$.pipe(
      map((lotes) =>
        lotes.filter(
          (lote: {
            Codigo_interno:any;
            fecha_arrivo:any;
            fecha_caducidad:any;
            fecha_adquisio: any,
            costo:any;
            id:any;
          }) =>
            lote.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            lote.Codigo_interno.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            lote.fecha_arrivo.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            lote.fecha_caducidad.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            lote.fecha_adquisio.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            lote.costo.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
        )
      )
    );
  }
  Refresh() {
    location.reload();
  }
  Delete(id: string) {
    deleteDialog(id,this.crud,'lotes',this.dialog,PopUpComponent);

  }
  openDialog(id: string, url: string, title: string, table: string) {
    openDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
}
