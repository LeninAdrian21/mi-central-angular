import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { DataDimensionesService } from '../../service/data-dimensiones.service';
import { Dimension } from '../../functions/functions';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  filter:any;
  $dimensiones = this.data.dimensiones$;
  dataDimensiones:any[] = [];
  displayedColumns:string[] = table.Dimensiones.columns;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor( private data:DataDimensionesService, private service: CrudService, private dialog:MatDialog) { }
  ngOnInit(): void {
    if(this.service.addCampo == true){
      this.service.addCampo = false;
      return location.reload();
    }
    this.Listar();
  }
  applyFilter(event: Event) {
    Dimension.ApplyFilter(event,this.dataSource)

  }
  Refresh(){
    this.dataSource.data = this.dataDimensiones;
    this.filter = '';
  }
  Listar(){
    this.$dimensiones.subscribe( element =>{
      element.forEach((element:any, index:any) => {
        let data = {
          no:index + 1,
          id:element.id,
          nombre: element.nombre,
          ancho: element.ancho,
          alto: element.alto,
          largo: element.largo,
          productos: element.productos
        }
        this.dataDimensiones.push(data);
      });
      this.dataSource.data = this.dataDimensiones;
    }
    )
  }
  openDialog(id: string, url: string, title: string, table: string) {
    Dimension.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Dimension.delete(id,this.service);
  }
}
