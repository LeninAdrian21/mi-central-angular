import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { PopUpComponent } from 'src/app/pop-up/pop-up.component';
import { CrudService } from 'src/app/services/crud.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { deleteDialog, deleteDialogMostrar, openDialog } from 'src/functions/functions';
import { table } from 'src/functions/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  title: string = table.Creditos.title;
  creditos$ = this.service.creditos$;
  displayedColumns: string[] = table.Creditos.columns;
  constructor( private service:GetdataService, private crud:CrudService,private dialog:MatDialog) { }
  ngOnInit(): void {
    if (this.crud.addCampo == true){
      this.crud.addCampo = false;
      return location.reload();
    }
  }
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.creditos$ = this.creditos$.pipe(
        map(creditos => creditos.filter((credito: {
          limite:any;
          Fecha_alta:any;
          fecha_baja:any;
          vigencia:any;
          intereses:any;
          status:any;
          id:any;
        }) => credito.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        credito.limite.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        credito.Fecha_alta.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        credito.fecha_baja.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        credito.vigencia.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        credito.intereses.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        credito.status.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1)));
    }
    Refresh(){
      location.reload();
    }
    Delete(id:string){
      // deleteDialog(id,this.crud,'creditos',this.dialog,PopUpComponent)
      deleteDialogMostrar(id, this.crud,'creditos','Credito',this.dialog,PopUpComponent);
    }
    openDialog(id: string, url: string, title: string, table: string) {
      openDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
    }
}
