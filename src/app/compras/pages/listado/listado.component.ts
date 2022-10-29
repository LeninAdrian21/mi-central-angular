import { MatDialog } from '@angular/material/dialog';
import { deleteDialog, openDialog } from 'src/functions/functions';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { table } from 'src/functions/table';
import { PopUpComponent } from 'src/app/pop-up/pop-up.component';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  title: string = table.Compras.title;
  compras$ = this.service.compras$;
  displayedColumns: string[] = table.Compras.columns;
  constructor( private service:GetdataService, private crud:CrudService, private dialog: MatDialog) { }
  ngOnInit(): void {
    if (this.crud.addCampo == true){
      this.crud.addCampo = false;
      return location.reload();
    }
  }
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.compras$ = this.compras$.pipe(
        map((compras: any[]) => compras.filter((compra: {
          costo:any;
          fecha_pedido:any;
          referencia:any;
          fecha_llegada:any;
          status:any;
          id:any;
        }) => compra.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
        || compra.costo.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
        || compra.fecha_pedido.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
        || compra.referencia.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
        || compra.fecha_llegada.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
        || compra.status.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1)));
  }
  Refresh(){
    location.reload();
  }
  Delete(id:string){
    deleteDialog(id,this.crud,'compras',this.dialog,PopUpComponent)
  }
  openDialog(id: string, url: string, title: string, table: string) {
    openDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
}

