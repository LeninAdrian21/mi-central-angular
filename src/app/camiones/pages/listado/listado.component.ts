import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/app/dialogcomponent/functions/functions';
import { Camion } from '../../functions/functions';
import { DataCamionesService } from '../../service/data-camiones.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  start = 0;
  limit = 2;
  $camiones = this.data.camiones$;
  // filter:any;
  // $camiones = this.data.camiones$;
  // dataCamiones:any[] =[];
  // displayedColumns: string[] = table.Camiones.columns;
  // dataSource = new MatTableDataSource<any>([]);
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  constructor(private data:DataCamionesService, private service: CrudService,private dialog: MatDialog) { }

  ngOnInit(): void {
    // if (this.service.addCampo == true) {
    //   this.service.addCampo = false;
    //   return location.reload();
    // }
    // this.Listar();
  }
  // applyFilter(event:any){
  //   // Camion.ApplyFilter(event,this.dataSource);
  // }
  // Refresh(){
  //   // this.dataSource.data = this.dataCamiones;
  //   // this.filter = '';
  // }
  // Listar(){
  //   this.$camiones.subscribe(element=>{
  //     element.forEach((element:any, index:any) => {
  //       const {placas} = element;
  //       let placa_activa:any;
  //       if(placas){
  //         placas.forEach((placa:any) => {
  //           if(placa.activa){
  //             placa_activa = placa;
  //           }
  //         });
  //       }
  //       let data = {
  //         no:index + 1,
  //         id:element.id,
  //         num_serie:element.num_serie,
  //         niv:element.niv,
  //         placas:placa_activa,
  //         historial:element.historial,
  //         rutas:element.rutas,
  //         gastos:element.gastos,
  //         usuario:element.usuario
  //       };
  //       this.dataCamiones.push(data);
  //     });
  //     this.dataSource.data = this.dataCamiones;
  //   })
  // }
  // openDialog(id:string, url:string, title:string, table:string){
  //   Camion.openDialog(id,url,title,table,this.dialog,DialogcomponentComponent)
  // }
  // Delete(id:string){
  //   Camion.delete(id,this.service);
  // }
}
