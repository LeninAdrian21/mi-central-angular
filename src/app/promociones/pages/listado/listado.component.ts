import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { DataPromocionesService } from '../../service/data-promociones.service';
import { Promocion } from '../../functions/functions';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  filter:any;
  $promociones = this.data.promociones$;
  dataPromociones:any[] = [];
  displayedColumns:string[] = table.Promociones.columns;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private data:DataPromocionesService, private service: CrudService, private dialog:MatDialog
  ){}
  ngOnInit(): void {
    if(this.service.addCampo == true){
      this.service.addCampo = false;
      return location.reload();
    }
    this.Listar();
  }
  applyFilter(event:any){
    Promocion.ApplyFilter(event,this.dataSource)
  }
  Refresh(){
    this.dataSource.data = this.dataPromociones;
    this.filter = '';
  }
  Listar(){
    this.$promociones.subscribe(element =>{
      element.forEach((element:any, index:any) => {
        let data = {
          no:index + 1,
          id:element.id,
          fecha_creacion:element.fecha_creacion,
          fecha_vigencia:element.fecha_vigencia,
          valor_descuento:element.valor_descuento,
          codigo_ref:element.codigo_ref,
          condicion:element.condicion,
          productos:element.productos
        }
        this.dataPromociones.push(data);
      });
      this.dataSource.data = this.dataPromociones;
    });
  }
  openDialog(id:string, url:string,title:string, table:string){
    Promocion.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Promocion.delete(id,this.service);
  }
}
