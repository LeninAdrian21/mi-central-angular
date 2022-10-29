import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { PopUpComponent } from 'src/app/pop-up/pop-up.component';
import { CrudService } from 'src/app/services/crud.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { deleteDialog, openDialog } from 'src/functions/functions';
import { table } from 'src/functions/table';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  title: string = table.MetodoPago.title;
  metodoPago$ = this.service.metodoPago$;
  displayedColumns: string[] = table.MetodoPago.columns;
  constructor( private service:GetdataService, private crud:CrudService,private dialog:MatDialog) { }
  ngOnInit(): void {
    if (this.crud.addCampo == true){
      this.crud.addCampo = false;
      return location.reload();
    }
  }
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      //filtrat todo, id del abono, la cantidad del abono, fecha de abono y  estado de abonoen el observable de otroabonos$
      this.metodoPago$ = this.metodoPago$.pipe(
        map(metodoPagos => metodoPagos.filter((metodoPago: {
          numero_tarjeta: any;
          mes: any;
          anio:any;
          cvc:any;
          titular:any;
          fecha_expedicion:any;
          fecha_ingreso:any;
          folio:any;
          referencia:any;
          tipo:any;
          descripcion:any;
          id: any;}) =>
          metodoPago.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          metodoPago.numero_tarjeta.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          metodoPago.mes.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          metodoPago.anio.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          metodoPago.cvc.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          metodoPago.titular.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          metodoPago.fecha_expedicion.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          metodoPago.fecha_ingreso.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          metodoPago.folio.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          metodoPago.referencia.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          metodoPago.tipo.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          metodoPago.descripcion.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1))
        );
    }
    Refresh(){
      location.reload();
    }
    Delete(id: string) {
      deleteDialog(id,this.crud,'abonos',this.dialog,PopUpComponent);
    }
    openDialog(id: string, url: string, title: string, table: string) {
      openDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
    }
}
