import { VariablesService } from './../../../core/service/variables.service';
import { Validators } from '@angular/forms';
import { GetdataService } from './../../../services/getdata.service';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { deleteDialogMostrar, openDialog } from 'src/functions/functions';
import { PopUpComponent } from 'src/app/pop-up/pop-up.component';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {
  private data$:Observable<any>;
  title: string = table.Abonos.title;
  abonos$ = this.service.abonos$;
  displayedColumns: string[] = table.Abonos.columns;
  public rol:any;
  mensaje:any = 'Hola soy un mensaje'
  constructor(
    private service: GetdataService,
    private crud: CrudService,
    private dialog: MatDialog,
    private variables: VariablesService
  ){
    this.data$ = variables.DataValidatorObservable;
  }
  ngOnInit(): void {
    if (this.crud.addCampo == true) {
      this.crud.addCampo = false;
      return location.reload();
    }
    this.data$.subscribe(data =>{
      this.rol = data.rol;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.abonos$ = this.abonos$.pipe(
      map((abonos) =>
        abonos.filter(
          (abono: {
            estado_abono: any;
            fecha_abono: any;
            cantidad_abono: any;
            id:any;
          }) =>
            abono.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            abono.cantidad_abono.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
            abono.fecha_abono.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
            abono.estado_abono.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase())!== -1
        )
      )
    );
  }
  Fecha(string:any){
    const fecha = new Date(string);
    let hora = fecha.toLocaleTimeString();
    let fecha2 = string.split('T');
    return `${string} --- ${fecha2[0]}, ${hora}`;
    // solo se puede buscar por la fecha
  }
  Refresh() {
    location.reload();
  }
  Delete(id: string) {
    // deleteDialog(id,this.crud,'abonos',this.dialog,PopUpComponent);
    deleteDialogMostrar(id, this.crud,'abonos','Abono',this.dialog,PopUpComponent);
  }
  openDialog(id: string, url: string, title: string, table: string) {
    openDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
}
