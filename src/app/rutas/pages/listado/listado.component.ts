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
  title: string= table.Rutas.title;
  rutas$ = this.service.rutas$;
  displayedColumns: string[] = table.Rutas.columns;
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
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    this.rutas$ = this.rutas$.pipe(
      map((rutas)=>
        rutas.filter(
          (ruta:{
            id:any,
            descripcion:any,
            lugar_origen:any,
            destino:any,
            fecha_salida:any,
            fecha_llegada:any,
            ruta_ciclica:any,
            referencia:any,
            nombre_mercancia_recibida:any,
            comentarios:any,
            estado:any
          }) =>
            ruta.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
            ruta.descripcion.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
            ruta.lugar_origen.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
            ruta.destino.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            ruta.fecha_salida.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            ruta.fecha_llegada.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            ruta.ruta_ciclica.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            ruta.referencia.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            ruta.nombre_mercancia_recibida.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            ruta.comentarios.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            ruta.estado.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
        )
      )
    )
  }
  Refresh() {
    location.reload();
  }
  Delete(id: string) {
    deleteDialog(id,this.crud,'rutas',this.dialog,PopUpComponent);
  }
  openDialog(id: string, url: string, title: string, table: string) {
    openDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
}
