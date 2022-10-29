import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
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
  title: string = table.Usuarios.title;
  usuarios$ = this.service.usuarios$;
  displayedColumns: string[]= table.Usuarios.columns;
  constructor(
    private service: GetdataService,
    private crud: CrudService,
    private dialog: MatDialog
  ){}
  ngOnInit(): void {

    if (this.crud.addCampo == true) {
      this.crud.addCampo = false;
      return location.reload();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usuarios$ = this.usuarios$.pipe(
      map((usuarios) =>
        usuarios.filter(
          (usuario: {
            id:any;
            nombre:any;
            ap_paterno:any;
            ap_materno:any;
            fecha_nacimiento:any;
            genero:any;
            fecha_inscripcion:any;
            fecha_alta:any;
            rfc:any;
            curp:any;
            nss:any;
            tel_cel:any;
            email:any;
            tipo_sangre:any;
            licencia:any;
            alergias:any;
            padecimientos:any;
            nacionalidad:any;
            calle:any;
            numero:any;
            colonia:any;
            cp:any;
            municipio:any;
            ciudad:any;
            pais:any;
            referencia_directa:any;
            comment:any;
            last_login:any;
            status:any;

          }) =>
            usuario.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
            usuario.nombre.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
            usuario.ap_paterno.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
            ||
            usuario.ap_materno.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.fecha_nacimiento.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.genero.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.fecha_inscripcion.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.fecha_alta.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.rfc.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.curp.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.nss.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.tel_cel.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.email.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.tipo_sangre.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.licencia.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.alergias.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.padecimientos.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.nacionalidad.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.calle.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.numero.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.colonia.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.cp.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.municipio.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.ciudad.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.pais.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.referencia_directa.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.comment.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.last_login.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            usuario.status.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
        )
      )
    );
  }
  Refresh() {
    location.reload();
  }
  Delete(id: string) {
    deleteDialog(id,this.crud,'usuarios',this.dialog,PopUpComponent);
  }
  openDialog(id:string, url: string, title: string, table: string) {
    openDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  last_Login(fecha:Date){
    const date = new Date(fecha);
    return date.toString();
  }
}
