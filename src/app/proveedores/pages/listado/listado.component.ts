import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { Proveedor } from '../../functions/functions';
import { DataProveedoresService } from '../../service/data-proveedores.service';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  start = 0; //Dato de inicio de la paginación
  limit = 20; //Limite de la pagina
  $proveedores = this.data.proveedores$; //datos de abonos
  items:any[]=[];
  keyword = 'nombre'; // lo que se buscara
  keywords = ['nombre','razon_social','rfc','fecha_alta','calle','numero','colonia','cp','municipio','ciudad','pais','visita_programada','status','compras','productos']; //datos de option de busqueda
  inputText:any = {'nombre':'Nombre','razon_social':'Razon social','rfc':'RFC','fecha_alta':'Fecha de alta','calle':'Calle','numero':'Numero','colonia':'Colonia','cp':'Codigo Postal','municipio':'Municipio','ciudad':'Ciudad','pais':'Pais','visita_programada':'Visita programada','status':'Status','status2':'Staus 2','compras':'Costo de la compra','productos':'Nombre del producto'}
  info: {[key: string]: any[];} = {nombre:[],razon_social:[],rfc:[],fecha_alta:[],calle:[],numero:[],colonia:[],cp:[],municipio:[],ciudad:[],pais:[],visita_programada:[],status:[],compras:[],productos:[]};
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.Proveedores.columns;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  totalCount = 0;
  NextPage: any;
  cargar = false;
  cargarInput = false;
  value: any;
  keywordHandlers:any = {
    'nombre':()=>{
      // 0
      this.getPaginator(this.busqueda.value);
    },
    'razon_social':()=>{
      // 1
      this.getPaginator(undefined,this.busqueda.value);
    },
    'rfc':()=>{
      // 2
      this.getPaginator(undefined,undefined,this.busqueda.value);
    },
    'fecha_alta':()=>{
      // 3
      this.getPaginator(undefined,undefined,undefined,this.busqueda.value);
    },
    'calle':()=>{
      // 4
      this.getPaginator(undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'numero':()=>{
      // 5
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'colonia':()=>{
      // 6
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'cp':()=>{
      // 7
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'municipio':()=>{
      // 8
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'ciudad':()=>{
      // 9
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'pais':()=>{
      // 10
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'visita_programada':()=>{
      // 11
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'status':()=>{
      // 12
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'status2':()=>{
      // 13
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'compras':()=>{
      // 14
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'productos':()=>{
      // 15
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'default': () => {
      this.getPaginator();
    }
  };
  constructor(
    private data:DataProveedoresService, private service: CrudService, private dialog:MatDialog
  ){}
  ngOnInit() {
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
    business_name?: string,
    rfc?: string,
    start_date?: string,
    street?: string,
    number?: string,
    colony?: string,
    postal_code?: number,
    municipality?: string,
    city?: string,
    country?: string,
    scheduled_visit?: string,
    status?: boolean,
    status2?: string,
    purchase_cost?: any,
    product_name?: string) {
    this.data.GetPaginator(this.start,this.limit,  name,business_name,rfc,start_date,street,number,colony,postal_code,municipality,city,country,scheduled_visit,status,status2,purchase_cost,product_name).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;
      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
    });
  }
  ListarData() {
    this.$proveedores.subscribe(element =>{
      Proveedor.ListaAutoComplete(this.info,element);
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
    this.limit = 20;
    this.items = [];
    const handler = this.keywordHandlers[this.keyword];
    if (handler) {
      handler(this);
    }
  }
  Vaciar(){
    this.start = 0;
    this.limit = 20;
    this.dataSource.data = [];
    this.items = [];
    this.totalCount = 0;
    this.busqueda.reset();
    this.keyword = 'nombre';
    this.getPaginator();
  }
  openDialog(id:string, url:string,title:string, table:string){
    Proveedor.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Proveedor.delete(id,this.service);
  }
}
