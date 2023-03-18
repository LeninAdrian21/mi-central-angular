import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { PopUpComponent } from 'src/app/pop-up/pop-up.component';
import { CrudService } from 'src/app/services/crud.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { deleteDialog, openDialog } from 'src/functions/functions';
import { table } from 'src/functions/table';
import { Usuario } from '../../functions/functions';
import { DataUsuariosService } from '../../service/data-usuarios.service';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  filter:any;
  $usuarios = this.data.usuarios$;
  dataUsuarios:any[] = [];
  displayedColumns:string[] = table.Usuarios
  .columns;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private data:DataUsuariosService, private service: CrudService, private dialog:MatDialog
  ){}
  ngOnInit(): void {
    console.log(this.$usuarios);
    if(this.service.addCampo == true){
      this.service.addCampo = false;
      return location.reload();
    }
    this.Listar();
  }
  applyFilter(event: Event) {
    Usuario.ApplyFilter(event,this.dataSource)
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.usuarios$ = this.usuarios$.pipe(
    //   map((usuarios) =>
    //     usuarios.filter(
    //       (usuario: {
    //         id:any;
    //         nombre:any;
    //         ap_paterno:any;
    //         ap_materno:any;
    //         fecha_nacimiento:any;
    //         genero:any;
    //         fecha_inscripcion:any;
    //         fecha_alta:any;
    //         rfc:any;
    //         curp:any;
    //         nss:any;
    //         tel_cel:any;
    //         email:any;
    //         tipo_sangre:any;
    //         licencia:any;
    //         alergias:any;
    //         padecimientos:any;
    //         nacionalidad:any;
    //         calle:any;
    //         numero:any;
    //         colonia:any;
    //         cp:any;
    //         municipio:any;
    //         ciudad:any;
    //         pais:any;
    //         referencia_directa:any;
    //         comment:any;
    //         last_login:any;
    //         status:any;

    //       }) =>
            // usuario.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
            // usuario.nombre.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
            // usuario.ap_paterno.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
            // ||
            // usuario.ap_materno.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.fecha_nacimiento.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.genero.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.fecha_inscripcion.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.fecha_alta.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.rfc.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.curp.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.nss.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.tel_cel.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.email.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.tipo_sangre.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.licencia.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.alergias.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.padecimientos.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.nacionalidad.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.calle.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.numero.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.colonia.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.cp.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.municipio.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.ciudad.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.pais.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.referencia_directa.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.comment.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.last_login.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1||
            // usuario.status.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
    //     )
    //   )
    // );
  }
  Refresh(){
    this.dataSource.data = this.dataUsuarios;
    this.filter = '';
  }
  Listar(){
    this.$usuarios.subscribe(element =>{
      element.forEach((element:any, index:any) => {
        let data = {
          no:index + 1,
          id:element.id,
          nombre:element.nombre,
          ap_paterno:element.ap_paterno,
          ap_materno:element.ap_materno,
          fecha_nacimiento:element.fecha_nacimiento,
          genero:element.genero,
          fecha_inscripcion:element.fecha_inscripcion,
          fecha_alta:element.fecha_alta,
          rfc:element.rfc,
          curp:element.curp,
          nss:element.nss,
          tel_cel:element.tel_cel,
          email:element.email,
          tipo_sangre:element.tipo_sangre,
          licencia:element.licencia,
          alergias:element.alergias,
          padecimientos:element.padecimientos,
          nacionalidad:element.nacionalidad,
          calle:element.calle,
          numero:element.numero,
          colonia:element.colonia,
          cp:element.cp,
          municipio:element.municipio,
          ciudad:element.ciudad,
          pais:element.pais,
          referencia_directa:element.referencia_directa,
          comment:element.comment,
          last_login:element.last_login,
          status:element.status,
          tipo_rol:element.tipo_rol,
          locals:element.locals,
          gastos:element.gastos,
          ventas:element.ventas,
          camiones:element.camiones,
          carritos:element.carritos,
          abonos:element.abonos,
          creditos:element.creditos,
          historiales:element.historiales,
          metodo_pagos:element.metodo_pagos,
        }
        this.dataUsuarios.push(data);
      });
      this.dataSource.data = this.dataUsuarios;
    });
  }
  openDialog(id:string, url:string,title:string, table:string){
    Usuario.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Usuario.delete(id,this.service);
  }
}
