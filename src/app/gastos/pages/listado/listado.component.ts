import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataGastosService } from '../../service/data-gastos.service';
import { Gasto } from '../../functions/functions';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  filter:any;
  $gastos = this.data.gastos$;
  dataGastos:any[] = [];
  displayedColumns:string[] = table.Gastos.columns;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private data:DataGastosService, private service: CrudService, private dialog:MatDialog ){}
  ngOnInit(): void {
    if(this.service.addCampo == true){
      this.service.addCampo = false;
      return location.reload();
    }
    this.Listar();
  }
  applyFilter(event: Event) {
    Gasto.ApplyFilter(event, this.dataSource);
  }
  Listar(){
    this.$gastos.subscribe(element =>{
      element.forEach((element:any, index:any) => {
        let data = {
          no:index + 1,
          id:element.id,
          descripcion:element.descripcion,
          fecha:element.fecha,
          monto:element.monto,
          categoria:element.categoria,
          status:element.status,
          usuario:element.usuario,
          camiones:element.camions
        }
        this.dataGastos.push(data);
      });
      this.dataSource.data = this.dataGastos;
    });

  }
  Refresh(){
    this.dataSource.data = this.dataGastos;
    this.filter = '';
  }
  openDialog(id:string, url:string,title:string, table:string){
    Gasto.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Gasto.delete(id,this.service);
  }
}
