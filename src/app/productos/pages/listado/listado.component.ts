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
  title: string = table.Productos.title;
  productos$ = this.service.productos$;
  displayedColumns: string[] = table.Productos.columns;
  constructor( private service:GetdataService, private crud:CrudService, private dialog: MatDialog) { }
  ngOnInit(): void {
    if(this.crud.addCampo == true){
      this.crud.addCampo = false;
      return location.reload();
    }
  }
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      //filtrat todo, id del abono, la cantidad del abono, fecha de abono y  estado de abonoen el observable de otroabonos$
      this.productos$ = this.productos$.pipe(
        map(productos => productos.filter((producto: {
          nombre: any;
          codigo_barras: any;
          codigo_interno: any;
          peso_neto: any;
          presentacion: any;
          marca: any;
          descripcion_generica: any;
          precio: any;
          costo: any;
          inventario_disp: any;
          value_min: any;
          status: any;
          venta_gramos: any;
          id: any;}) =>
          producto.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          producto.nombre.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          producto.codigo_barras.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          producto.codigo_interno.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          producto.peso_neto.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          producto.presentacion.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          producto.marca.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          producto.descripcion_generica.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          producto.precio.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          producto.costo.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          producto.inventario_disp.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          producto.value_min.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          producto.status.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          producto.venta_gramos.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
          )));
    }
    Refresh(){
      location.reload();
    }
    Delete(id: string) {
      deleteDialog(id,this.crud,'productos',this.dialog,PopUpComponent);
    }
    openDialog(id: string, url: string, title: string, table: string) {
      openDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
    }
}
