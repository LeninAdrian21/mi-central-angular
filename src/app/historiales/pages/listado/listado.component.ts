import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { table } from 'src/functions/table';
import { CrudService } from '../../../services/crud.service';
import { Historial } from '../../functions/functions';
import { DataHistorialesService } from '../../service/data-historiales.service';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  filter:any;
  $historiales = this.data.historiales$;
  dataHistoriales:any[] = [];
  displayedColumns:string[] = table.Historiales.columns;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private data:DataHistorialesService,
    private service:CrudService,
    private dialog:MatDialog
  ) { }
  ngOnInit(): void {
    if(this.service.addCampo == true){
      this.service.addCampo = false;
      return location.reload();
    }
    this.Listar();
  }
  applyFilter(event:any){
    Historial.ApplyFilter(event,this.dataSource)
  }
  Refresh(){
    this.dataSource.data = this.dataHistoriales;
    this.filter = '';
  }
  Listar(){
    this.$historiales.subscribe(element =>{
      element.forEach((element:any, index:any) => {
        let data = {
          no:index + 1,
          id:element.id,
          fecha:element.fecha,
          status:element.status,
          hora_inicio:element.hora_inicio,
          hora_fin:element.hora_fin,
          usuario:element.usuario,
          camiones:element.camiones
        }
        this.dataHistoriales.push(data);
      });
      this.dataSource.data = this.dataHistoriales;
    });
  }
  openDialog(id:string, url:string,title:string, table:string){
    Historial.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Historial.delete(id,this.service);
  }

}
