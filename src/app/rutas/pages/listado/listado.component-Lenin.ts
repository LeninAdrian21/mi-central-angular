import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';

import { CrudService } from 'src/app/services/crud.service';
import { GetdataService } from 'src/app/services/getdata.service';
// import { deleteDialog, openDialog } from 'src/functions/functions';
import { table } from 'src/functions/table';
import { Ruta } from '../../functions/functions';
import { DataRutasService } from '../../service/data-rutas.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  start = 0; //Dato de inicio de la paginación
  limit = 20; //Limite de la pagina
  $rutas = this.data.rutas$ //datos de abonos
  items:any[]=[];
  keyword = 'descripcion'; // lo que se buscara
  keywords = ['descripcion','lugar_origen','destino','fecha_salida','fecha_llegada','referencia','nombre_mercancia_recibida','comentarios','estado','ruta_ciclica','camiones','ventas']; //datos de option de busqueda
  inputTex:any = {'descripcion':'Descripcion','lugar_origen':'Lugar de origen','destino':'Destino','fecha_salida':'Fecha de salida','fecha_llegada':'Fecha de llegada','referencia':'Referencia','nombre_mercancia_recibida':'Nombre de la mercancia recibida','comentarios':'Comentarios','estado':'Estado','ruta_ciclica':'Ruta ciclica','camiones':'Numero de serie del camion','ventas':'Monto de la venta'}
  info: {[key: string]: any[];} = {descripcion:[],lugar_origen:[],destino:[],fecha_salida:[],fecha_llegada:[],referencia:[],nombre_mercancia_recibida:[],comentarios:[],estado:[],ruta_ciclica:[],camiones:[],ventas:[]};
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.Rutas.columns;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  totalCount = 0;
  NextPage: any;
  cargar = false;
  cargarInput = false;
  value: any;
  keywordHandlers:any = {
    'descripcion':()=>{
      // 0
      this.getPaginator(this.busqueda.value);
    },
    'lugar_origen':()=>{
      // 1
      this.getPaginator(undefined, this.busqueda.value);
    },
    'destino':()=>{
      // 2
      this.getPaginator(undefined,undefined, this.busqueda.value);
    },
    'fecha_salida':()=>{
      // 3
      this.getPaginator(undefined,undefined,undefined,this.busqueda.value);
    },
    'fecha_llegada':()=>{
      // 4
      this.getPaginator(undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'referencia':()=>{
      // 5
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'nombre_mercancia_recibida':()=>{
      // 6
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'comentarios':()=>{
      // 7
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'estado':()=>{
      // 8
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'ruta_ciclica':()=>{
      // 9
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'camiones':()=>{
      // 10
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'ventas':()=>{
      // 11
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'default': () => {
      this.getPaginator();
    }
  };
  constructor(
    private data:DataRutasService, private service: CrudService, private dialog:MatDialog
  ){}
  ngOnInit(): void {
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
    description?: string,
    origin?: string,
    destination?: string,
    departure_date?: string,
    arrival_date?: string,
    reference?: string,
    received_goods_name?: string,
    comments?: string,
    state?: string,
    cyclic_route?: boolean,
    trucks_serial_number?: string,
    sales_amount?: any) {
    this.data.GetPaginator(this.start,this.limit, description,origin,destination,departure_date,arrival_date,reference,received_goods_name,comments,state,cyclic_route,trucks_serial_number,sales_amount).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;
      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
    });
  }
  ListarData() {
    this.$rutas.subscribe(element =>{
      Ruta.ListaAutoComplete(this.info,element);
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
    this.keyword = 'descripcion';
    this.getPaginator();
  }
  openDialog(id:string, url:string,title:string, table:string){
    Ruta.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Ruta.delete(id,this.service);
  }
}
