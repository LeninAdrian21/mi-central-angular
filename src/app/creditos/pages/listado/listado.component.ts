import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataCreditosService } from '../../service/data-creditos.service';
import { Credito } from '../../functions/functions';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  filter:any;
  $creditos = this.data.creditos$;
  dataCreditos:any[] = [];
  displayedColumns:string[] = table.Creditos.columns;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private data:DataCreditosService, private service: CrudService, private dialog:MatDialog) { }
  ngOnInit(): void {
    if (this.service.addCampo == true){
      this.service.addCampo = false;
      return location.reload();
    }
    this.Listar();
  }
  applyFilter(event: Event) {
    Credito.ApplyFilter(event,this.dataSource);
  }
  Refresh(){
    this.dataSource.data = this.dataCreditos;
    this.filter = '';
  }
  Listar(){
    this.$creditos.subscribe(element =>{
      element.forEach((element:any, index:any) => {
        let data = {
          no:index + 1,
          id:element.id,
          limite:element.limite,
          fecha_alta:element.fecha_alta,
          fecha_baja:element.fecha_baja,
          vigencia:element.vigencia,
          intereses:element.intereses,
          status:element.status,
          usuario:element.usuario,
          metodo_pago:element.metodo_pago,
          abonos:element.abonos
        }
        this.dataCreditos.push(data);
      });
      this.dataSource.data = this.dataCreditos;
    });
  }
  openDialog(id:string, url:string,title:string, table:string){
    Credito.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Credito.delete(id,this.service);
  }
}
