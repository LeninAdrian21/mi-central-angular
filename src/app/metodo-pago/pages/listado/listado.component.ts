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
  start = 0; //Dato de inicio de la paginación
  limit = 2; //Limite de la pagina
  $metodosPago = this.data.metodosPago$; //datos de abonos
  items:any[]=[];
  keyword = 'numero_tarjeta'; // lo que se buscara
  keywords = ['numero_tarjeta','mes','anio','cvc','titular','folio', 'fecha_expedicion','fecha_ingreso','descripcion','referencia','tipo','compras','creditos','usuario', 'venta']; //datos de option de busqueda
  inputTex:any = {'numero_tarjeta':'Numero de tarjeta','mes':'Mes','anio':'Año','cvc':'cvc','titular':'Titular','folio':'Folio', 'fecha_expedicion':'Fecha de expedicion','fecha_ingreso':'Fecha de ingreso','descripcion':'Descripcion','referencia':'Referencia','tipo':'Tipo','compras':'Costo de la compra','creditos':'Limite del credito','usuario':'Nombre del usuario', 'venta':'Monto de la venta'}
  info: {[key: string]: any[];} = {numero_tarjeta:[],mes:[],anio:[],cvc:[],titular:[],folio:[], fecha_expedicion:[],fecha_ingreso:[],descripcion:[],referencia:[],tipo:[],compras:[],creditos:[],usuario:[], venta:[]};
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
    'numero_tarjeta':()=>{

    },
    'mes':()=>{

    },
    'anio':()=>{

    },
    'cvc':()=>{

    },
    'titular':()=>{

    },
    'folio':()=>{

    },
    'fecha_expedicion':()=>{

    },
    'fecha_ingreso':()=>{

    },
    'descripcion':()=>{

    },
    'referencia':()=>{

    },
    'tipo':()=>{

    },
    'compras':()=>{

    },
    'creditos':()=>{

    },
    'usuario':()=>{

    },
    'venta':()=>{

    },
    'default': () => {
      this.getPaginator();
    }
  };
  constructor(private data:DataMetodosPagoService, private service: CrudService, private dialog:MatDialog ) { }
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
    card_number?: string,
    month?: string,
    year?: string,
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
    this.data.GetPaginator(this.start,this.limit,card_number,month,year,cvc,holder,invoice,expedition_date,admission_date,description,reference,type,shopping_cost,credits_limit,username,sale_amount).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;
      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
      console.log('data',this.items)
      console.log(this.totalCount)
    });
  }
  ListarData() {
    this.$metodosPago.subscribe(element =>{
      MetodoPago.ListaAutoComplete(this.info,element);
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
    this.keyword = 'cantidad_abono'
    this.getPaginator();
  } 
  // // title: string = table.MetodoPagos.title;
  // // displayedColumns: string[] = table.MetodoPagos.columns;
  // filter:any;
  // metodosPago$ = this.data.metodosPago$;
  // dataMetodosPago:any[] = [];
  // displayedColumns:string[] = table.MetodoPagos.columns;
  // dataSource = new MatTableDataSource<any>([]);
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  // ngOnInit(): void {
  //   if(this.service.addCampo == true){
  //     this.service.addCampo = false;
  //     return location.reload();
  //   }
  //   this.Listar();
  // }
  // applyFilter(event: Event) {
  //   MetodoPago.ApplyFilter(event,this.dataSource)
  // }
  // Refresh(){
  //   this.dataSource.data = this.dataMetodosPago;
  //   this.filter = '';
  // }
  // Listar(){
  //   this.metodosPago$.subscribe(element =>{
  //     element.forEach((element:any, index:any) => {
  //       let data = {
  //         no:index + 1,
  //         id:element.id,
  //         numero_tarjeta:element.numero_tarjeta,
  //         mes:element.mes,
  //         anio:element.anio,
  //         cvc:element.cvc,
  //         titular:element.titular,
  //         fecha_expedicion:element.fecha_expedicion,
  //         fecha_ingreso:element.fecha_ingreso,
  //         folio:element.folio,
  //         referencia:element.referencia,
  //         tipo:element.tipo,
  //         descripcion:element.descripcion,
  //         usuario:element.usuario,
  //         venta:element.venta,
  //         creditos:element.creditos,
  //         compras:element.compras
  //       }
  //       this.dataMetodosPago.push(data);
  //     });
  //     this.dataSource.data = this.dataMetodosPago;
  //   });
  // }
  // openDialog(id:string, url:string,title:string, table:string){
  //   MetodoPago.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  // }
  // Delete(id:string){
  //   MetodoPago.delete(id,this.service);
  // }
}
