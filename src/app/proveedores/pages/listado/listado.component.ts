import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { Proveedor } from '../../functions/functions';
import { DataProveedoresService } from '../../service/data-proveedores.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  filter:any;
  $proveedores = this.data.proveedores$;
  dataProveedores:any[] = [];
  displayedColumns:string[] = table.Proveedores.columns;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private data:DataProveedoresService, private service: CrudService, private dialog:MatDialog
  ){}
  ngOnInit(): void {
    if(this.service.addCampo == true){
      this.service.addCampo = false;
      return location.reload();
    }
    this.Listar();
  }
  applyFilter(event: Event) {
    Proveedor.ApplyFilter(event,this.dataSource)
  }
  Listar(){
    this.$proveedores.subscribe(element =>{
      element.forEach((element:any, index:any) => {
        let data = {
          no:index + 1,
          id:element.id,
          nombre:element.nombre,
          razon_social:element.razon_social,
          rfc:element.rfc,
          fecha_alta:element.fecha_alta,
          calle:element.calle,
          numero:element.numero,
          colonia:element.colonia,
          cp:element.cp,
          municipio:element.municipio,
          ciudad:element.ciudad,
          pais:element.pais,
          visita_programada:element.visita_programada,
          status:element.status,
          productos:element.productos,
          compras:element.compras,
        }
        this.dataProveedores.push(data);
      });
      this.dataSource.data = this.dataProveedores;
    });
    // id

  }
  Refresh(){
    this.dataSource.data = this.dataProveedores;
    this.filter = '';
  }
  openDialog(id:string, url:string,title:string, table:string){
    Proveedor.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Proveedor.delete(id,this.service);
  }
  VisitaProgramada(string:string){
    const fecha = new Date(string);
    let hora = fecha.toLocaleTimeString();
    let fecha2 = string.split('T');
    return `${string} --- Fecha: ${fecha2[0]}, Hora: ${hora}`;
    // se debe de buscar el lo primero que sale despues de l --- no se puede buscar
  }
}
