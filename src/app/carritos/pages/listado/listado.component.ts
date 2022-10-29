import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { openDialog, deleteDialog } from 'src/functions/functions';
import { table } from 'src/functions/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { PopUpComponent } from 'src/app/pop-up/pop-up.component';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  title: string = table.Carritos.title;
  carritos$ = this.service.carritos$;
  displayedColumns: string[] = table.Carritos.columns;
  constructor( private service:GetdataService, private crud:CrudService, private dialog:MatDialog) { }
  ngOnInit(): void {
    if (this.crud.addCampo == true){
      this.crud.addCampo = false;
      return location.reload();
    }
  }
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.carritos$ = this.carritos$.pipe(
        map(carritos => carritos.filter((carrito: {
          cantidad: any;
          id:any;
        }) => carrito.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
        carrito.cantidad.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1)));
    }
    Refresh(){
      location.reload();
    }
    Delete(id:string){
      deleteDialog(id,this.crud,'carritos',this.dialog,PopUpComponent)
    }
    openDialog(id:string,url:string,title:string,table:string){
      openDialog(id,url,title,table,this.dialog,DialogcomponentComponent)
    }
}
