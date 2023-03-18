import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { MetodoPago } from '../../functions/functions';
import { DataMetodosPagoService } from '../../service/data-metodos-pago.service';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  // title: string = table.MetodoPagos.title;
  // displayedColumns: string[] = table.MetodoPagos.columns;
  filter:any;
  metodosPago$ = this.data.metodosPago$;
  dataMetodosPago:any[] = [];
  displayedColumns:string[] = table.MetodoPagos.columns;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private data:DataMetodosPagoService, private service: CrudService, private dialog:MatDialog ) { }
  ngOnInit(): void {
    if(this.service.addCampo == true){
      this.service.addCampo = false;
      return location.reload();
    }
    this.Listar();
  }
  applyFilter(event: Event) {
    MetodoPago.ApplyFilter(event,this.dataSource)
  }
  Refresh(){
    this.dataSource.data = this.dataMetodosPago;
    this.filter = '';
  }
  Listar(){
    this.metodosPago$.subscribe(element =>{
      element.forEach((element:any, index:any) => {
        let data = {
          no:index + 1,
          id:element.id,
          numero_tarjeta:element.numero_tarjeta,
          mes:element.mes,
          anio:element.anio,
          cvc:element.cvc,
          titular:element.titular,
          fecha_expedicion:element.fecha_expedicion,
          fecha_ingreso:element.fecha_ingreso,
          folio:element.folio,
          referencia:element.referencia,
          tipo:element.tipo,
          descripcion:element.descripcion,
          usuario:element.usuario,
          venta:element.venta,
          creditos:element.creditos,
          compras:element.compras
        }
        this.dataMetodosPago.push(data);
      });
      this.dataSource.data = this.dataMetodosPago;
    });
  }
  openDialog(id:string, url:string,title:string, table:string){
    MetodoPago.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    MetodoPago.delete(id,this.service);
  }
}
