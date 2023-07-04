import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { CrudService } from 'src/app/services/crud.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { table } from 'src/functions/table';
import { Venta } from '../../functions/functions';
import { DataVentasService } from '../../service/data-ventas.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  start = 0; //Dato de inicio de la paginación
  limit = 20; //Limite de la pagina
  $ventas = this.data.ventas$; //datos de abonos
  items:any[]=[];
  keyword = 'monto'; // lo que se buscara
  keywords = ['monto','monto_total','fecha','clasificacion','fecha_entrega','entrega_pendiente','pagada','status','status2','local','usuario','carritos','metodo_pagos','rutas','vendedores']; //datos de option de busqueda
  inputTex:any = {monto:'Monto',monto_total:'Monto total',fecha:'Fecha',clasificacion:'Clasificacion',fecha_entrega:'Fecha de entrega',entrega_pendiente:'Entrega pendiente',pagada:'Pagada',status:'Status',status2:'Status2',local:'nombre del local',usuario:'Nombre del usuario',carritos:'Cantidad de carrito',metodo_pagos:'Titular',rutas:'Destino de la ruta',vendedores:'Nombre del vendedor'}
  info: {[key: string]: any[];} = {monto:[],monto_total:[],fecha:[],clasificacion:[],fecha_entrega:[],entrega_pendiente:[],pagada:[],status:[],status2:[],local:[],usuario:[],carritos:[],metodo_pagos:[],rutas:[],vendedores:[]};
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.Ventas.columns;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  totalCount = 0;
  NextPage: any;
  cargar = false;
  cargarInput = false;
  value: any;
  keywordHandlers:any = {
    monto: () => {
      // 0
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(this.value);
    },
    monto_total:() => {
      // 1
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined, this.value);
    },
    fecha:() => {
      // 2
      this.getPaginator(undefined, undefined, this.busqueda.value);
    },
    clasificacion:() => {
      // 3
      this.getPaginator(undefined, undefined,undefined, this.busqueda.value);
    },
    fecha_entrega:() => {
      // 4
      this.getPaginator(undefined, undefined,undefined,undefined, this.busqueda.value);
    },
    entrega_pendiente:() => {
      // 5
      this.getPaginator(undefined, undefined,undefined,undefined,undefined, this.busqueda.value);
    },
    pagada:() => {
      // 6
      this.getPaginator(undefined, undefined,undefined,undefined,undefined,undefined, this.busqueda.value);
    },
    status:() => {
      // 7
      this.getPaginator(undefined, undefined,undefined,undefined,undefined,undefined,undefined, this.busqueda.value);
    },
    status2:() => {
      // 8
      this.getPaginator(undefined, undefined,undefined,undefined,undefined,undefined,undefined,undefined, this.busqueda.value);
    },
    local:() => {
      // 9
      this.getPaginator(undefined, undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined, this.busqueda.value);
    },
    usuario:() => {
      // 10
      this.getPaginator(undefined, undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined, this.busqueda.value);
    },
    carritos:() => {
      // 11
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined, undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined, this.value);
    },
    metodo_pagos:() => {
      // 12
      this.getPaginator(undefined, undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined, this.busqueda.value);
    },
    rutas:() => {
      // 13
      this.getPaginator(undefined, undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined, this.busqueda.value);
    },
    vendedores:() => {
      // 14
      this.getPaginator(undefined, undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    default: () => {
      this.getPaginator();
    }
  };
  constructor(
    private data:DataVentasService, private service: CrudService, private dialog:MatDialog
  ){}
  ngOnInit(): void {
    if(this.service.addCampo == true){
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
    amount?: number,
    total_amount?: number,
    date?: string,
    classification?: string,
    delivery_date?: string,
    delivery_pending?: boolean,
    paid?: boolean,
    status?: boolean,
    status2?: string,
    location_name?: string,
    user_name?: string,
    carts_quantity?: number,
    payment_methods_owner?: string,
    destination_routes?: string,
    sellers_name?: string) {
    this.data.GetPaginator(this.start, this.limit, amount,
      total_amount,
      date,
      classification,
      delivery_date,
      delivery_pending,
      paid,
      status,
      status2,
      location_name,
      user_name,
      carts_quantity,
      payment_methods_owner,
      destination_routes,
      sellers_name).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;
      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
    });
  }
  ListarData() {
    this.$ventas.subscribe(element =>{
      Venta.ListaAutoComplete(this.info,element);
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
    this.keyword = 'monto'
    this.getPaginator();
  }
  openDialog(id:string, url:string,title:string, table:string){
    Venta.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Venta.delete(id,this.service);
  }
}
