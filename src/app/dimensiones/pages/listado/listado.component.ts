import { MatDialog } from '@angular/material/dialog';
import { deleteDialog, openDialog } from 'src/functions/functions';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { PopUpComponent } from 'src/app/pop-up/pop-up.component';
import { CrudService } from 'src/app/services/crud.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { table } from 'src/functions/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  title: string = table.Dimensiones.title;
  dimensiones$ = this.service.dimensiones$;
  displayedColumns: string[] = table.Dimensiones.columns;
  constructor( private service:GetdataService, private crud:CrudService, private dialog : MatDialog) { }
  ngOnInit(): void {
    if (this.crud.addCampo == true){
      this.crud.addCampo = false;
      return location.reload();
    }
  }
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dimensiones$ = this.dimensiones$.pipe(
        map(dimensiones => dimensiones.filter((dimension: {
          Nombre:any;
          ancho:any;
          alto:any;
          largo:any;
          id:any;
        }) => dimension.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        dimension.Nombre.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        dimension.ancho.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        dimension.alto.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        dimension.largo.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 )));
    }
    Refresh(){
      location.reload();
    }
    Delete(id:string){

      deleteDialog(id,this.crud,'dimensiones',this.dialog,PopUpComponent);
    }
    openDialog(id: string, url: string, title: string, table: string) {
      openDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
    }
}
