import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { PopUpComponent } from 'src/app/pop-up/pop-up.component';
import { CrudService } from 'src/app/services/crud.service';
import { deleteDialog, openDialog } from 'src/functions/functions';
import { table } from 'src/functions/table';
import { DataVendedoresService } from '../../service/data-vendedores.service';
import { Vendedor } from '../../functions/functions';
import { ventasForm } from '../../../../functions/form';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  filter:any;
  $vendedores = this.data.vendedores$;
  dataAbonos:any[] = [];
  displayedColumns:string[] = table.Abonos.columns;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private data:DataVendedoresService, private service: CrudService, private dialog:MatDialog
  ){}
  ngOnInit(): void {
    if(this.service.addCampo == true){
      this.service.addCampo = false;
      return location.reload();
    }
    this.Listar();
  }
  applyFilter(event: Event) {
    Vendedor.ApplyFilter(event,this.dataSource)
  }
  Refresh() {
    this.dataSource.data = this.dataAbonos;
    this.filter = '';
  }
  Listar(){
    this.$vendedores.subscribe(element =>{
      element.forEach((element:any, index:any) => {
        let data = {
          no:index + 1,
          id:element.id,
          nombre:element.nombre,
          ventas:element.ventas
        }
        this.dataAbonos.push(data);
      });
      this.dataSource.data = this.dataAbonos;
    });
  }
  openDialog(id:string, url:string,title:string, table:string){
    Vendedor.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Vendedor.delete(id,this.service);
  }
}
