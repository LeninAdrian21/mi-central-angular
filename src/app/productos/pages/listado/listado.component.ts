import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { Producto } from '../../functions/functions';
import { DataProductosService } from '../../service/data-productos.service';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  filter:any;
  $productos = this.data.productos$;
  dataProductos:any[] = [];
  displayedColumns:string[] = table.Productos.columns;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor( private data:DataProductosService, private service: CrudService, private dialog:MatDialog ) { }
  ngOnInit(): void {
    if(this.service.addCampo == true){
      this.service.addCampo = false;
      return location.reload();
    }
    this.Listar();
  }
  applyFilter(event: Event) {
    Producto.ApplyFilter(event,this.dataSource)
  }
  Refresh(){
    this.dataSource.data = this.dataProductos;
    this.filter = '';
  }
  Listar(){
    this.$productos.subscribe(element =>{
      element.forEach((element:any, index:any) => {
        console.log(element);
        let data = {
          no:index + 1,
          id:element.id,
          nombre:element.nombre,
          codigo_barras:element.codigo_barras,
          codigo_interno:element.codigo_interno,
          peso_neto:element.peso_neto,
          presentacion:element.presentacion,
          marca:element.marca,
          descripcion_generica:element.descripcion_generica,
          precio:element.precio,
          costo:element.costo,
          inventario_disp:element.inventario_disp,
          valor_min:element.value_min,
          status:element.status,
          venta_gramos:element.venta_gramos,
          dimension:element.dimension,
          lotes:element.lotes,
          proveedor:element.proveedor,
          promociones:element.promociones,
          carritos:element.carritos
        }
        this.dataProductos.push(data);
      });
      this.dataSource.data = this.dataProductos;
    });
  }
  openDialog(id:string, url:string,title:string, table:string){
    Producto.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Producto.delete(id,this.service);
  }
}
