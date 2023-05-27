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
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  // filter:any;
  // $locales = this.data.locales$;
  // dataLocales:any[] = [];
  // displayedColumns:string[] = table.Locales.columns;
  // dataSource = new MatTableDataSource<any>([]);
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  start = 0; //Dato de inicio de la paginación
  limit = 2; //Limite de la pagina
  $locales = this.data.locales$;//datos de abonos
  items:any[]=[];
  keyword = 'nombre'; // lo que se buscara
  keywords = ['nombre','alias','razon_social','rfc','fecha_alta','calle','colonia','numero_ext','municipio','numero_int','ciudad','cp','latitud','longitud','telefono','telefono_cel','giro','status','status2','usuarios','ventas']; //datos de option de busqueda
  inputTex:any = {'nombre':'Nombre','alias':'Alias','razon_social':'Razon social','rfc':'RFC','fecha_alta':'Fecha de alta','calle':'Calle','colonia':'Colonia','numero_ext':'Numero exterior','municipio':'Municipio','numero_int':'Numero interno','ciudad':'Ciudad','cp':'Codigo postal','latitud':'Latitud','longitud':'Longitud','telefono':'Telefono','telefono_cel':'Celular','giro':'Giro del local','status':'Status','status2':'Status2','usuarios':'Usuario','ventas':'Ventas'}
  info: {[key: string]: any[];} = {nombre:[],alias:[],razon_social:[],rfc:[],fecha_alta:[],calle:[],colonia:[],numero_ext:[],municipio:[],numero_int:[],ciudad:[],cp:[],latitud:[],longitud:[],telefono:[],telefono_cel:[],giro:[],status:[],status2:[],usuarios:[],ventas:[]};
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.Locales.columns;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  totalCount = 0;
  NextPage: any;
  cargar = false;
  cargarInput = false;
  value: any;
  keywordHandlers:any = {
    'nombre':() =>{
      this.getPaginator(this.busqueda.value);
    },
    'alias':() =>{
      //1
      this.getPaginator(undefined,this.busqueda.value);
    },
    'razon_social':() =>{
      //2
      this.getPaginator(undefined,undefined,this.busqueda.value);
    },
    'rfc':() =>{//3
      this.getPaginator(undefined,undefined,undefined,this.busqueda.value);
    },
    'fecha_alta':() =>{//4
      this.getPaginator(undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'calle':() =>{//5
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'colonia':() =>{//6
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'numero_ext':() =>{//7
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'municipio':() =>{//8
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'numero_int':() =>{//9
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'ciudad':() =>{//10
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'cp':() =>{//11
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'latitud':() =>{//12
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'longitud':() =>{//13
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'telefono':() =>{//14
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'telefono_cel':() =>{//15
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'giro':() =>{//16
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'status':() =>{//17
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'status2':() =>{//18
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'usuarios':() =>{//19
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'ventas':() =>{//20
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'default': () => {
      this.getPaginator();
    }
    // 'cantidad': () => {
    //   this.value = parseInt(this.busqueda.value);
    //   this.getPaginator(this.value);
    // },
    // 'productos': () => {
    //   this.getPaginator(undefined, this.busqueda.value);
    // },
    // 'usuario': () => {
    //   this.getPaginator(undefined, undefined, this.busqueda.value);
    // },
    // 'venta': () => {
    //   this.value = parseFloat(this.busqueda.value);
    //   this.getPaginator(undefined, undefined, undefined, this.value);
    // },
    
  };
  constructor( private data:DataLocalesService, private service: CrudService, private dialog:MatDialog ) { }
  ngOnInit(): void {
    // if(this.service.addCampo == true){
    //   this.service.addCampo = false;
    //   return location.reload();
    // }
    // this.Listar();
    if (this.service.addCampo == true) {
      this.service.addCampo = false;
      return location.reload();
    }
    this.getPaginator();
    this.ListarData();

    this.filteredOptions = this.busqueda.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    )
  }
  private _filter(value: any): any[] {
    const filterValue = value.toString().toLowerCase();
    return this.info[this.keyword].filter(option => option.toString().toLowerCase().includes(filterValue));
  }
  loadMore(){
    const handler = this.keywordHandlers[this.keyword] || this.keywordHandlers['default'];
    if(this.NextPage){
      this.start += this.limit;
      handler();
    }
  }
  getPaginator(
    name?: string,
    alias?: string,
    social_reason?: string,
    rfc?: string,
    high_date?: string,
    street?: string,
    cologne?: string,
    street_number?: number,
    municipality?: string,
    internal_number?: number,
    city?: string,
    cp?: number,
    latitude?: any,
    length?: any,
    phone?: number,
    cell_phone?: number,
    turn?: string,
    status?: boolean,
    status2?: string,
    user?: string,
    sales?: number) {
    this.data.GetPaginator(this.start,this.limit,name,alias,social_reason,rfc,high_date,street,cologne,street_number,municipality,internal_number,city,cp,latitude,length,phone,cell_phone,turn,status,status2,user,sales).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;

      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
      console.log('data',this.items)
      console.log(this.totalCount)
    });
  }
  ListarData() {
    this.$locales.subscribe(element =>{
      Local.ListaAutoComplete(this.info,element);
    })
  }
  onScrollHandler(event: any) {
    const miDiv = event.target; // Obtiene el elemento contenedor
    const pixelsDesplazados = miDiv.scrollTop; // Obtiene la cantidad de píxeles desplazados
    const pixelsScrollTotal = miDiv.scrollHeight - miDiv.clientHeight ; // Obtiene la cantidad total de píxeles de scroll
    if(parseInt(pixelsDesplazados)+1 == pixelsScrollTotal && this.NextPage || parseInt(pixelsDesplazados) + 2 == pixelsScrollTotal && this.NextPage){
      this.cargar = true;
      setTimeout(() => {
        // this.cargar = true;
        this.loadMore();
        this.cargar = false;

      }, 1000);
    }
  }
  Buscador(event:any){
    this.start = 0;
    this.limit = 2;
    this.items = [];
    const handler = this.keywordHandlers[this.keyword];
    if (handler) {
      handler(this);
    }
  }
  Vaciar(){
    this.start = 0;
    this.limit = 2;
    this.dataSource.data = [];
    this.items = [];
    this.totalCount = 0;
    this.busqueda.reset();
    this.keyword = 'nombre';
    this.getPaginator();
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
    // Delete(id: string) {
    //   deleteDialog(id,this.crud,'locals',this.dialog,PopUpComponent);
    // }
    // openDialog(id: string, url: string, title: string, table: string) {
    //   openDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
    // }
// }
