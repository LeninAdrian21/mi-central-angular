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
  // filter:any;
  // $productos = this.data.productos$;
  // dataProductos:any[] = [];
  // displayedColumns:string[] = table.Productos.columns;
  // dataSource = new MatTableDataSource<any>([]);
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  start = 0; //Dato de inicio de la paginación
  limit = 2; //Limite de la pagina
  $productos = this.data.productos$ //datos de abonos
  items:any[]=[];
  keyword = 'nombre'; // lo que se buscara
  keywords = ['nombre','peso_neto', 'presentacion','marca','descripcion_generica','precio','costo','inventario_disp', 'value_min','codigo_barras','codigo_interno','venta_gramos','status','status2','dimension','proveedor','carritos','promociones','lotes']; //datos de option de busqueda
  inputTex:any = {'nombre':'Nombre','peso_neto':'Peso Neto', 'presentacion':'Presentacion','marca':'Marca','descripcion_generica':'Descripcion Generica','precio':'Precio','costo':'Costo','inventario_disp':'Inventario disponible', 'value_min':'Valor disponible','codigo_barras':'Codigo Barras','codigo_interno':'Codigo Interno','venta_gramos':'Venta Gramos','status':'Status','status2':'Status2','dimension':'Nombre Dimension','proveedor':'Nombre Dimension','carritos':'Cantidad del carrito','promociones':'Fecha de cracion de la promocion','lotes':'Codigo interno del Lote'};
  //
  info: {[key: string]: any[];} = {nombre:[],peso_neto:[], presentacion:[],marca:[],descripcion_generica:[],precio:[],costo:[],inventario_disp:[], value_min:[],codigo_barras:[],codigo_interno:[],venta_gramos:[],status:[],status2:[],dimension:[],proveedor:[],carritos:[],promociones:[],lotes:[]};
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
    'status2':()=>{
      // 13
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'dimension':()=>{
      // 14
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'proveedor':()=>{
      // 15
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'carritos':()=>{
      // 16
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'promociones':()=>{
      // 17
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'lotes':()=>{
      //18 unefined
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
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
  getPaginator(// número de elementos a mostrar en la página
    nombre?:string, // nombre del producto
    peso_neto?:any, // peso neto del producto
    presentacion?:string, // presentación del producto
    marca?:string, // marca del producto
    descripcion_generica?:string, // descripción genérica del producto
    precio?:any, // precio del producto
    costo?:any, // costo del producto
    inventario_disp?:number, // inventario disponible del producto
    value_min?:number, // valor mínimo del producto
    codigo_barras?:number, // código de barras del producto
    codigoInterno?:number, // código interno del producto
    venta_gramos?:any, // venta por gramos del producto
    status?:boolean, // estado del producto
    status2?:string, // otro estado del producto
    dimension_nombre?:string, // nombre de la dimensión del producto
    provedor_nombre?:string,
    carritos_cantidad?:any, // cantidad de productos en el carrito
    promociones_fecha_creacion?:string, // fecha de creación de la promoción del producto
    lotes_codigo_interno?:number) {
    this.data.GetPaginator(this.start,this.limit,
    nombre, // nombre del producto
    peso_neto, // peso neto del producto
    presentacion, // presentación del producto
    marca, // marca del producto
    descripcion_generica, // descripción genérica del producto
    precio, // precio del producto
    costo, // costo del producto
    inventario_disp, // inventario disponible del producto
    value_min, // valor mínimo del producto
    codigo_barras, // código de barras del producto
    codigoInterno, // código interno del producto
    venta_gramos, // venta por gramos del producto
    status, // estado del producto
    status2, // otro estado del producto
    dimension_nombre, // nombre de la dimensión del producto
    provedor_nombre,
    carritos_cantidad, // cantidad de productos en el carrito
    promociones_fecha_creacion, // fecha de creación de la promoción del producto
    lotes_codigo_interno
      ).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;
      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
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
    Producto.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Producto.delete(id,this.service);
  }

}
