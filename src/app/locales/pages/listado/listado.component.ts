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
  title: string = table.Locales.title;
  locales$ = this.service.locales$;
  displayedColumns: string[] = table.Locales.columns;
  constructor( private service:GetdataService, private crud:CrudService,private dialog:MatDialog) { }
  ngOnInit(): void {
    console.log(this.locales$);
    if(this.crud.addCampo == true){
      this.crud.addCampo = false;
      return location.reload();
    }
  }
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      //filtrat todo, id del abono, la cantidad del abono, fecha de abono y  estado de abonoen el observable de otroabonos$
      this.locales$ = this.locales$.pipe(
        map(locales => locales.filter((local: {
          nombre: any;
          alias: any;
          razon_social: any;
          rfc: any;
          fecha_alta: any;
          calle:any;
          Colonia:any;
          numero_ext:any;
          Municipio:any;
          numero_int:any;
          ciudad:any;
          cp:any;
          latitud:any;
          longitud:any;
          telefono:any;
          telefono_cel:any;
          giro:any;
          status:any;
          id: any;
        }) => local.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.nombre.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.alias.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.razon_social.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.rfc.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.fecha_alta.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.calle.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.Colonia.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.numero_ext.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.Municipio.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.numero_int.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.ciudad.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.cp.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.latitud.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.longitud.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.telefono.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.telefono_cel.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.giro.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
      local.status.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
)));
    }
    Refresh(){
      location.reload();
    }
    Delete(id: string) {
      deleteDialog(id,this.crud,'locals',this.dialog,PopUpComponent);
    }
    openDialog(id: string, url: string, title: string, table: string) {
      openDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
    }
}
