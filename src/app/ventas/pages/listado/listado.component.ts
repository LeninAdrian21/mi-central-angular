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
import { Venta } from '../../functions/functions';
import { DataVentasService } from '../../service/data-ventas.service';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  filter:any;
  $ventas = this.data.ventas$;
  dataVentas:any[] = [];
  displayedColumns:string[] = table.Ventas.columns;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private data:DataVentasService, private service: CrudService, private dialog:MatDialog
  ){}
  ngOnInit(): void {
    if(this.service.addCampo == true){
      this.service.addCampo = false;
      return location.reload();
    }
    this.Listar();
  }
  applyFilter(event: Event) {
    Venta.ApplyFilter(event,this.dataSource)
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.ventas$ = this.ventas$.pipe(
    //   map((ventas) =>
    //     ventas.filter(
    //       (venta: {
    //         id:any,
    //         monto:any,
    //         monto_total:any,
    //         fecha:any,
    //         status:any,
    //         clasificacion:any,
    //         fecha_entrega:any,
    //         entrega_pendiente:any,
    //         pagada:any
    //       }) =>

    //     )
    //   )
    // );
  }
  Listar(){
    this.$ventas.subscribe(element =>{
      element.forEach((element:any, index:any) => {
        let data = {
          no:index + 1,
          id:element.id,
          monto:element.monto,
          monto_total:element.monto_total,
          fecha:element.fecha,
          status:element.status,
          factura:element.factura,
          clasificacion:element.clasificacion,
          fecha_entrega:element.fecha_entrega,
          entrega_pendiente:element.entrega_pendiente,
          pagada:element.pagada,
          usuario:element.usuario,
          local:element.local,
          rutas:element.rutas,
          vendedores:element.vendedores,
          carritos:element.carritos,
          metodo_pagos:element.metodo_pagos
        }
        this.dataVentas.push(data);
      });
      this.dataSource.data = this.dataVentas;
    });
  }
  Refresh() {
    this.dataSource.data = this.dataVentas;
    this.filter = '';
  }
  openDialog(id:string, url:string,title:string, table:string){
    Venta.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Venta.delete(id,this.service);
  }
}
