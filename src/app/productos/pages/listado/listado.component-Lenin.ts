import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { Producto } from '../../functions/functions';
import { DataProductosService } from '../../service/data-productos.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  start = 0; //Dato de inicio de la paginación
  limit = 20; //Limite de la pagina
  $productos = this.data.productos$ //datos de abonos
  items:any[]=[];
  keyword = 'nombre'; // lo que se buscara
  keywords = ['nombre','peso_neto', 'presentacion','marca','descripcion_generica','precio','costo','inventario_disp', 'value_min','codigo_barras','codigo_interno','venta_gramos','status',
  // 'status2',
  'dimension','proveedor','carritos','promociones','lotes'];
  inputTex:any = {'nombre':'Nombre','peso_neto':'Peso Neto', 'presentacion':'Presentacion','marca':'Marca','descripcion_generica':'Descripcion Generica','precio':'Precio','costo':'Costo','inventario_disp':'Inventario disponible', 'value_min':'Valor disponible','codigo_barras':'Codigo Barras','codigo_interno':'Codigo Interno','venta_gramos':'Venta Gramos','status':'Status',
  // 'status2':'Status2',
  'dimension':'Nombre de dimension','proveedor':'Nombre del proveedor','carritos':'Cantidad del carrito','promociones':'Fecha de creacion de la promocion','lotes':'Codigo interno del Lote'};
  info: {[key: string]: any[];} = {nombre:[],peso_neto:[], presentacion:[],marca:[],descripcion_generica:[],precio:[],costo:[],inventario_disp:[], value_min:[],codigo_barras:[],codigo_interno:[],venta_gramos:[],status:[],
    // status2:[],
  dimension:[],proveedor:[],carritos:[],promociones:[],lotes:[]};
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.Productos.columns;
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
    'peso_neto':()=>{
      // 1
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined,this.value);
    },
    'presentacion':()=>{
      // 2
      this.getPaginator(undefined,undefined,this.busqueda.value);
    },
    'marca':()=>{
      // 3
      this.getPaginator(undefined,undefined,undefined,this.busqueda.value);
    },
    'descripcion_generica':()=>{
      // 4
      this.getPaginator(undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'precio':()=>{
      // 5
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'costo':()=>{
      // 6
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'inventario_disp':()=>{
      // 7
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'value_min':()=>{
      // 8
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'codigo_barras':()=>{
      // 9
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'codigo_interno':()=>{
      // 10
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'venta_gramos':()=>{
      // 11
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'status':()=>{
      // 12
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    // 'status2':()=>{
    //   // 13
    //   this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    // },
    'dimension':()=>{
      // 14
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'carritos':()=>{
      // 15
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'promociones':()=>{
      // 16
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'lotes':()=>{
      // 17
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'proveedor':()=>{
      //18 unefined
      this.getPaginator(
        undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,
        this.busqueda.value);
    },
    'default': () => {
      this.getPaginator();
    }
  };
  constructor( private data:DataProductosService, private service: CrudService, private dialog:MatDialog ) { }
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
  name?: string,
  net_weight?: any,
  presentation?: string,
  brand?: string,
  generic_description?: string,
  price?: any,
  cost?: any,
  available_inventory?: number,
  value_min?:number,
  barcode?: number,
  internal_code?: number,
  sale_grams?: any,
  status?: boolean,
  status2?: string,
  size_name?: string,
  carts_quantity?: any,
  promotions_date_creation?:string,
  batches_internal_code?:number,
  provider_name?:string
  ) {
    this.data.GetPaginator(this.start,this.limit,
      name,
      net_weight,
      presentation,
      brand,
      generic_description,
      price,
      cost,
      available_inventory,
      value_min,
      barcode,
      internal_code,
      sale_grams,
      status,
      status2,
      size_name,
      carts_quantity,
      promotions_date_creation,
      batches_internal_code,
      provider_name
      ).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;
      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
      console.log('data',this.items)
      console.log(this.totalCount)
    });
  }
  ListarData() {
    this.$productos.subscribe(element =>{
      Producto.ListaAutoComplete(this.info,element);
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
    this.limit = 20
    ;
    this.dataSource.data = [];
    this.items = [];
    this.totalCount = 0;
    this.busqueda.reset();
    this.keyword = 'nombre';
    this.getPaginator();
  }
  openDialog(id:string, url:string,title:string, table:string){
    Producto.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Producto.delete(id,this.service);
  }

}
