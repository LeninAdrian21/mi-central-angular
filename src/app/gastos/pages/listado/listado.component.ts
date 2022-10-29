import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { PopUpComponent } from 'src/app/pop-up/pop-up.component';
import { CrudService } from 'src/app/services/crud.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { deleteDialog, openDialog } from 'src/functions/functions';
import { table } from 'src/functions/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  title: string = table.Gastos.title;
  gastos$ = this.service.gastos$;
  displayedColumns: string[] = table.Gastos.columns;
  constructor( private service:GetdataService, private crud:CrudService, private dialog : MatDialog) { }
  ngOnInit(): void {
    if(this.crud.addCampo == true){
      this.crud.addCampo = false;
      return location.reload();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.gastos$ = this.gastos$.pipe(
      map((gastos) =>
      gastos.filter(
        (gasto: {
        descripcion:any;
        fecha:any;
        monto:any;
        categoria:any;
        status:any;
        id:any;
      }) => gasto.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      gasto.descripcion.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      gasto.fecha.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      gasto.monto.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      gasto.categoria.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      gasto.status.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
      )));
  }
  Refresh(){
    location.reload();
  }
  Delete(id:string){
    deleteDialog(id,this.crud,'gastos',this.dialog,PopUpComponent)
  }
  openDialog(id: string, url: string, title: string, table: string) {
    openDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
}
