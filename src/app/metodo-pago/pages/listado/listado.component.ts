import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { MetodoPago } from '../../functions/functions';
import { DataMetodosPagoService } from '../../service/data-metodos-pago.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  start = 0;
  limit = 20;
  $metodosPago = this.data.metodosPago$;
  items:any[]=[];
  keyword = 'numero_tarjeta'; // lo que se buscara
  keywords = ['numero_tarjeta','mes','anio','cvc','titular','folio', 'fecha_expedicion','fecha_ingreso','descripcion','referencia','tipo','compras','creditos','usuario', 'venta']; //datos de option de busqueda
  inputText:any =
  {numero_tarjeta:'Numero de tarjeta',
  mes:'Mes',
  anio:'Año',
  cvc:'CVC',
  titular:'Titular',
  folio:'Folio',
  fecha_expedicion:'Fecha de expedicion',
  fecha_ingreso:'Fecha de ingreso',
  descripcion:'Descripcion',
  referencia:'Referencia',
  tipo:'Tipo',
  compras:'Costo de la compra',
  creditos:'Limite del credito',
  usuario:'Nombre del usuario',
  venta:'Monto de la venta'}
  info: {[key: string]: any[];} = {
    numero_tarjeta:[],
    mes:[],
    anio:[],
    cvc:[],
    titular:[],
    folio:[],
    fecha_expedicion:[],
    fecha_ingreso:[],
    descripcion:[],
    referencia:[],
    tipo:[],
    compras:[],
    creditos:[],
    usuario:[],
    venta:[]
  };
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.MetodoPagos.columns;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  totalCount = 0;
  NextPage: any;
  cargar = false;
  cargarInput = false;
  value: any;
  keywordHandlers:any = {
    numero_tarjeta:()=>{
      // 0
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(this.value);
    },
    mes:()=>{
      // 1
      this.getPaginator(undefined,this.busqueda.value);
    },
    anio:()=>{
      // 2
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,this.value);
    },
    cvc:()=>{
      // 3
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,this.value);
    },
    titular:()=>{
      // 4
      this.getPaginator(undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    folio:()=>{
      // 5
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,this.value);
    },
    fecha_expedicion:()=>{
      // 6
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    fecha_ingreso:()=>{
      // 7
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    descripcion:()=>{
      // 8
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    referencia:()=>{
      // 9
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    tipo:()=>{
      // 10
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    compras:()=>{
      // 11
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    creditos:()=>{
      // 12
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    usuario:()=>{
      // 13
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    venta:()=>{
      // 14
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    default: () => {
      this.getPaginator();
    }
  };
  constructor(private data:DataMetodosPagoService, private service: CrudService, private dialog:MatDialog ) { }
  ngOnInit(): void {
    if (this.service.addCampo == true) {
      this.service.addCampo = false;
      return location.reload();
    }
    this.filteredOptions = this.busqueda.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    )
    this.getPaginator();
    this.ListarData();

  }
  private _filter(value: any): any[] {
    const filterValue = value.toString().toLowerCase();
    return this.info[this.keyword].filter(option => option.toString().toLowerCase().includes(filterValue));
  }
  getPaginator(
    card_number?: number,
    month?: string,
    year?: number,
    cvc?: number,
    holder?: string,
    invoice?: number,
    expedition_date?: string,
    admission_date?: string,
    description?: string,
    reference?: string,
    type?: string,
    shopping_cost?: number,
    credits_limit?: number,
    username?: string,
    sale_amount?: number) {
    this.data.GetPaginator(this.start,this.limit,
      card_number,month,year,cvc,holder,invoice,expedition_date,admission_date,description,reference,type,shopping_cost,credits_limit,username,sale_amount
      ).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;
      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
    });
  }
  ListarData() {
    this.$metodosPago.subscribe(element =>{
      MetodoPago.ListaAutoComplete(this.info,element);
    })
  }
  onScrollHandler(event: any) {
    const miDiv = event.target;
    const pixelsDesplazados = miDiv.scrollTop;
    const pixelsScrollTotal = miDiv.scrollHeight - miDiv.clientHeight ;
    if(parseInt(pixelsDesplazados)+1 == pixelsScrollTotal && this.NextPage || parseInt(pixelsDesplazados) + 2 == pixelsScrollTotal && this.NextPage){
      this.cargar = true;
      setTimeout(() => {
        // this.cargar = true;
        this.loadMore();
        this.cargar = false;

      }, 1000);
    }
  }
  loadMore(){
    const handler = this.keywordHandlers[this.keyword] || this.keywordHandlers['default'];
    if(this.NextPage){
      this.start += this.limit;
      handler();
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
    this.limit = 20;
    this.dataSource.data = [];
    this.items = [];
    this.totalCount = 0;
    this.busqueda.reset();
    this.keyword = 'numero_tarjeta';
    this.getPaginator();
  }
  openDialog(id:string, url:string,title:string, table:string){
    MetodoPago.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    MetodoPago.delete(id,this.service);
  }
}
