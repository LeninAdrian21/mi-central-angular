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
  title: string = table.Ventas.title;
  ventas$ = this.service.ventas$;
  displayedColumns: string[] = table.Ventas.columns;
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
    this.ventas$ = this.ventas$.pipe(
      map((ventas) =>
        ventas.filter(
          (venta: {
            id:any,
            monto:any,
            monto_total:any,
            fecha:any,
            status:any,
            clasificacion:any,
            fecha_entrega:any,
            entrega_pendiente:any,
            pagada:any
          }) =>
            venta.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
            ||
            venta.monto .toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            venta.monto_total.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            venta.fecha.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            venta.status.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            venta.clasificacion.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            venta.fecha_entrega.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            venta.entrega_pendiente.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            venta.pagada.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
        )
      )
    ); 
  }
  Refresh() {
    location.reload();
  }
  Delete(id: string) {
    deleteDialog(id,this.crud,'ventas',this.dialog,PopUpComponent);
  }
  openDialog(id: string, url: string, title: string, table: string) {
    openDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
}
