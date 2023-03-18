import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { PopUpComponent } from 'src/app/pop-up/pop-up.component';
import { CrudService } from 'src/app/services/crud.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { deleteDialog, openDialog } from 'src/functions/functions';
import { table } from 'src/functions/table';
import { Ruta } from '../../functions/functions';
import { DataRutasService } from '../../service/data-rutas.service';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  filter:any;
  $rutas = this.data.rutas$;
  dataRutas:any[] = [];
  displayedColumns:string[] = table.Rutas.columns;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private data:DataRutasService, private service: CrudService, private dialog:MatDialog
  ){}
  ngOnInit(): void {
    if(this.service.addCampo == true){
      this.service.addCampo = false;
      return location.reload();
    }
    this.Listar();
  }
  applyFilter(event:any){
    Ruta.ApplyFilter(event,this.dataSource)
  }
  Refresh(){
    this.dataSource.data = this.dataRutas;
    this.filter = '';
  }
  Listar(){
    this.$rutas.subscribe(element =>{
      element.forEach((element:any, index:any) => {
        let data = {
          no:index + 1,
          id:element.id,
          descripcion:element.descripcion,
          lugar_origen:element.lugar_origen,
          destino:element.destino,
          fecha_salida:element.fecha_salida,
          fecha_llegada:element.fecha_llegada,
          ruta_ciclica:element.ruta_ciclica,
          referencia:element.referencia,
          nombre_mercancia_recibida:element.nombre_mercancia_recibida,
          comentarios:element.comentarios,
          estado:element.estado,
          ventas:element.ventas,
          camiones:element.camiones,

        }
        this.dataRutas.push(data);
      });
      this.dataSource.data = this.dataRutas;
    });
  }
  openDialog(id:string, url:string,title:string, table:string){
    Ruta.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Ruta.delete(id,this.service);
  }
}
