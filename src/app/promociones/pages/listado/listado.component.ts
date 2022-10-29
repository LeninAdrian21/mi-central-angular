import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
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
  title:string = table.Promociones.title;
  promociones$ = this.service.promociones$;
  displayedColumns: string[] = table.Promociones.columns;
  constructor(
    private service: GetdataService,
    private crud: CrudService,
    private dialog: MatDialog
  ){}
  ngOnInit(): void {
    if (this.crud.addCampo == true) {
      this.crud.addCampo = false;
      return location.reload();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.promociones$ = this.promociones$.pipe(
      map((promociones) =>
        promociones.filter(
          (promocion: {
            fecha_creacion:any,
            fecha_vigencia:any,
            valor_descuento:any,
            codigo_ref:any,
            condicin:any
            id:any;
          }) =>
            promocion.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
            promocion.fecha_creacion.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
            promociones.fecha_vigencia.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
            promociones.valor_descuento.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
            promociones.codigo_ref.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
            promociones.condicion.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
        )
      )
    );
  }
  Refresh() {
    location.reload();
  }
  Delete(id: string) {
    deleteDialog(id,this.crud,'promociones',this.dialog,PopUpComponent);
  }
  openDialog(id: string, url: string, title: string, table: string) {
    openDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
}
