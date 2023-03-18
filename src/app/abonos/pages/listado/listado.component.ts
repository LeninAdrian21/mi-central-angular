import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { DataAbonosService } from '../../service/data-abonos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Abono } from '../../function/functions';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { Observable } from 'rxjs';
@Component({
    selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {
  data$:Observable<any> | undefined;
  filter:any;
  $abonos = this.data.abonos$;
  dataAbonos:any[] = [];
  refresh:any = localStorage.getItem('refresh');
  displayedColumns:string[] = table.Abonos.columns;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private data:DataAbonosService, private service: CrudService, private dialog:MatDialog,  ){
  }
  ngOnInit(): void {
    if(this.service.addCampo == true){
      this.service.addCampo = false;
      return location.reload();
    }
    this.Listar();
    console.log(this.paginator)
  }
  applyFilter(event:any){
    Abono.ApplyFilter(event,this.dataSource)
  }
  Refresh(){
    this.dataSource.data = this.dataAbonos;
    this.filter = '';
  }
  Listar(){
    this.$abonos.subscribe(element =>{
      element.forEach((element:any, index:any) => {
        let data = {
          no:index + 1,
          cantidad_abono:element.cantidad_abono,
          fecha_abono:Abono.Fecha(element.fecha_abono),
          estado_abono:element.estado_abono,
          credito:element.credito,
          usuario:element.usuario
        }
        this.dataAbonos.push(data);
      });
      this.dataSource.data = this.dataAbonos;
    });
  }
  openDialog(id:string, url:string,title:string, table:string){
    Abono.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Abono.delete(id,this.service);
  }
}
