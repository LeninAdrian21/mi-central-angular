import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit,ViewChild} from '@angular/core';
import { table } from 'src/functions/table';
import { DataComprasService } from '../../service/data-compras.service';
import { CrudService } from 'src/app/services/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { Compra } from '../../functions/functions';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  filter:any;
  $compras = this.data.compras$;
  dataCompras:any[] = [];
  displayedColumns:string[] = table.Compras.columns;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor( private data:DataComprasService, private service: CrudService, private dialog:MatDialog) { }
  ngOnInit(): void {
    if(this.service.addCampo == true){
      this.service.addCampo = false;
      return location.reload();
    }
    this.Listar();
  }
  applyFilter(event: Event) {
    Compra.ApplyFilter(event,this.dataSource);
  }
  Refresh(){
    this.dataSource.data = this.dataCompras;
    this.filter = '';
  }
  Listar(){
    this.$compras.subscribe(element =>{
      element.forEach((element:any,index:any) => {
        let data = {
          no:index + 1,
          id:element.id,
          costo:element.costo,
          fecha_pedido:element.fecha_pedido,
          referencia:element.referencia,
          fecha_llegada:element.fecha_llegada,
          status:element.status,
          metodo_pago:element.metodo_pago,
          lote:element.lote,
          proveedor:element.proveedor,
          usuarios:element.usuarios
        }
        this.dataCompras.push(data);
      });
      this.dataSource.data = this.dataCompras;
    });
    
  }
  openDialog(id:string, url:string,title:string, table:string){
    Compra.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Compra.delete(id,this.service);
  }
}

