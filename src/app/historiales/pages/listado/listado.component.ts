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
  title: string = table.Historiales.title;
  historiales$ = this.service.historiales$;
  displayedColumns: string[] = table.Historiales.columns;
  constructor( private service:GetdataService, private crud:CrudService, private dialog : MatDialog) { }
  ngOnInit(): void {
    if (this.crud.addCampo == true){
      this.crud.addCampo = false;
      return location.reload();
    }
  }
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.historiales$ = this.historiales$.pipe(
        map(historial => historial.filter((historial:{
          fecha:any;
          status:any;
          hora_inicio:any;
          hora_fin:any;
          id:any;
        })=>
          historial.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          historial.fecha.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          historial.status.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          historial.hora_inicio.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
          historial.hora_fin.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
        ))
      );
    }
    Refresh(){
      location.reload();
    }
    Delete(id: string) {
      deleteDialog(id,this.crud,'historials',this.dialog,PopUpComponent);
    }
    openDialog(id: string, url: string, title: string, table: string) {
      openDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
    }
}
