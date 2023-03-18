import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { CrudService } from 'src/app/services/crud.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { table } from 'src/functions/table';
import { Local } from '../../functions/functions';
import { DataLocalesService } from '../../service/data-locales.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  filter:any;
  $locales = this.data.locales$;
  dataLocales:any[] = [];
  displayedColumns:string[] = table.Locales.columns;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor( private data:DataLocalesService, private service: CrudService, private dialog:MatDialog ) { }
  ngOnInit(): void {
    if(this.service.addCampo == true){
      this.service.addCampo = false;
      return location.reload();
    }
    this.Listar();
  }
  applyFilter(event:any){
    Local.ApplyFilter(event,this.dataSource)
  }
  Refresh(){
    this.dataSource.data = this.dataLocales;
    this.filter = '';
  }
  Listar(){
    this.$locales.subscribe(element =>{

      element.forEach((element:any, index:any) => {
        let data = {
          no:index + 1,
          id:element.id,
          nombre:element.nombre,
          alias:element.alias,
          razon_social:element.razon_social,
          rfc:element.rfc,
          fecha_alta:element.fecha_alta,
          calle:element.calle,
          colonia:element.colonia,
          numero_ext:element.numero_ext,
          municipio:element.municipio,
          numero_int:element.numero_int,
          ciudad:element.ciudad,
          cp:element.cp,
          latitud:element.latitud,
          longitud:element.longitud,
          telefono:element.telefono,
          telefono_cel:element.telefono_cel,
          giro:element.giro,
          status:element.status,
          ventas:element.ventas,
          usuarios:element.usuarios
        }
        this.dataLocales.push(data);
      });
      this.dataSource.data = this.dataLocales;
    });
  }
  openDialog(id:string, url:string,title:string, table:string){
    Local.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Local.delete(id,this.service);
  }
}
//   applyFilter(event: Event) {
//       const filterValue = (event.target as HTMLInputElement).value;
//       //filtrat todo, id del abono, la cantidad del abono, fecha de abono y  estado de abonoen el observable de otroabonos$
//       this.locales$ = this.locales$.pipe(
//         map(locales => locales.filter((local: {
//           nombre: any;
//           alias: any;
//           razon_social: any;
//           rfc: any;
//           fecha_alta: any;
//           calle:any;
//           Colonia:any;
//           numero_ext:any;
//           Municipio:any;
//           numero_int:any;
//           ciudad:any;
//           cp:any;
//           latitud:any;
//           longitud:any;
//           telefono:any;
//           telefono_cel:any;
//           giro:any;
//           status:any;
//           id: any;
//         }) => local.id.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
//       local.nombre.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
//       local.alias.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
//       local.razon_social.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
//       local.rfc.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
//       local.fecha_alta.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
//       local.calle.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
//       local.Colonia.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
//       local.numero_ext.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
//       local.Municipio.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
//       local.numero_int.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
//       local.ciudad.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
//       local.cp.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
//       local.latitud.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
//       local.longitud.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
//       local.telefono.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
//       local.telefono_cel.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
//       local.giro.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1 ||
//       local.status.toString().toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1
// )));
//     }
//     Refresh(){
//       location.reload();
//     }
//     Delete(id: string) {
//       deleteDialog(id,this.crud,'locals',this.dialog,PopUpComponent);
//     }
//     openDialog(id: string, url: string, title: string, table: string) {
//       openDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
//     }
// }
