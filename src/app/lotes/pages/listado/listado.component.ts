import { DataLotesService } from './../../service/data-lotes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { table } from 'src/functions/table';
import { CrudService } from 'src/app/services/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { Lote } from '../../functions/functions';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  filter:any;
  $lotes = this.data.lotes$;
  dataLotes:any[] = [];
  displayedColumns:string[] = table.Lotes.columns;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private data:DataLotesService, private service: CrudService, private dialog:MatDialog ){}
  ngOnInit(): void {
    if(this.service.addCampo == true){
      this.service.addCampo = false;
      return location.reload();
    }
    this.Listar();
  }
  applyFilter(event:any){
    Lote.ApplyFilter(event,this.dataSource)
  }
  Refresh(){
    this.dataSource.data = this.dataLotes;
    this.filter = '';
  }
  Listar(){
    this.$lotes.subscribe(element =>{
      element.forEach((element:any, index:any) => {
        let data = {
          no:index + 1,
          id:element.id,
          codigo_interno:element.codigo_interno,
          fecha_arrivo:element.fecha_arrivo,
          fecha_caducidad:element.fecha_caducidad,
          fecha_adquisicion:element.fecha_adquisicion,
          costo:element.costo,
          compras:element.compras,
          productos:element.products

        }
        this.dataLotes.push(data);
      });
      this.dataSource.data = this.dataLotes;
    });
  }
  openDialog(id:string, url:string,title:string, table:string){
    Lote.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Lote.delete(id,this.service);
  }
}
