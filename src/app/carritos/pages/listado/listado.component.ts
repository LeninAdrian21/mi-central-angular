import { Component, OnInit, ViewChild } from '@angular/core';
import { table } from 'src/functions/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from 'src/app/services/crud.service';
import { DataCarritosService } from '../../service/data-carritos.service';
import { Carrito } from '../../functions/functions';
import { DialogcomponentComponent } from '../../../dialogcomponent/dialogcomponent.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  filter:any;
  $carritos = this.data.carritos$;
  dataCarritos:any[]=[];
  displayedColumns:string[] = table.Carritos.columns;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private data:DataCarritosService, private service: CrudService,private dialog: MatDialog) { }
  ngOnInit(): void {
    if(this.service.addCampo == true){
      this.service.addCampo = false;
      return location.reload();
    }
    this.Listar();
  }
  applyFilter(event:any){
    Carrito.ApplyFilter(event,this.dataSource);
  }
  Refresh(){
    this.dataSource.data = this.dataCarritos;
    this.filter = '';
  }
  Listar(){
    this.$carritos.subscribe(element=>{
      element.forEach((element:any,index:any) => {
        let data = {
          no:index + 1,
          id:element.id,
          cantidad:element.cantidad,
          usuario:element.usuario,
          productos:element.productos,
          venta:element.venta
        }
        this.dataCarritos.push(data);
      });
      this.dataSource.data = this.dataCarritos;
    })
  }
  openDialog(id:string,url:string,title:string,table:string){
    Carrito.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent)
  }
  Delete(id:string){
    Carrito.delete(id,this.service);
  }
}
