import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit,ViewChild} from '@angular/core';
import { table } from 'src/functions/table';
import { DataComprasService } from '../../service/data-compras.service';
import { CrudService } from 'src/app/services/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { Compra } from '../../functions/functions';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  // filter:any;
  // $compras = this.data.compras$;
  // dataCompras:any[] = [];
  // displayedColumns:string[] = table.Compras.columns;
  // dataSource = new MatTableDataSource<any>([]);
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  start = 0; //Dato de inicio de la paginación
  limit = 2; //Limite de la pagina
  $compras= this.data.compras$; //datos de abonos
  items:any[]=[];
  keyword = 'costo'; // lo que se buscara
  keywords = ['costo','fecha_pedido','referencia','fecha_llegada','lote','status','status2','metodo_pago','proveedor','usuarios']; //datos de option de busqueda
  inputTex:any = {'costo':'Costo','fecha_pedido':'Fecha del pedido','referencia':'Referencia','fecha_llegada':'Fecha de llegada','lote':'Lote','status':'Estado','status2':'Status2','metodo_pago':'Metodo de pago','proveedor':'Proveedor','usuarios':'Usuario'}
  info: {[key: string]: any[];} = {costo:[],fecha_pedido:[],referencia:[],fecha_llegada:[],lote:[],status:[],status2:[],metodo_pago:[],proveedor:[],usuarios:[]};
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.Compras.columns;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  totalCount = 0;
  NextPage: any;
  cargar = false;
  cargarInput = false;
  value: any;
  keywordHandlers:any = {
    'costo': () => {
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(this.value);
    },
    'fecha_pedido': () => {
      this.getPaginator(undefined, this.busqueda.value);
    },
    'referencia': () => {
      this.getPaginator(undefined,undefined,this.busqueda.value);
    },
    'fecha_llegada': () => {
      this.getPaginator(undefined,undefined,undefined,this.busqueda.value);
    },
    'status': () => {
      this.getPaginator(undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'status2': () => {
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'lote': () => {
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'metodo_pago': () => {
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'proveedor': () => {
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);//String
    },
    'usuarios': () => {
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);//String
    },
    'default': () => {
      this.getPaginator();
    }
  };
  
  constructor( private data:DataComprasService, private service: CrudService, private dialog:MatDialog) { }
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
    cost?: any,
    order_date?:string,
    reference?:string,
    arrival_date?:string,
    status?:boolean,
    status2?:string,
    lot?:number,
    payment_method?:number,
    provider?:string,
    user?:string){
    this.data.GetPaginator(this.start,this.limit,cost,order_date,reference,arrival_date,status,status2,lot,payment_method,provider,user).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;

      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
      console.log('data',this.items)
      console.log(this.totalCount)
    });
  }
  ListarData() {
    this.$compras.subscribe(element =>{
      Compra.ListaAutoComplete(this.info,element);
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
    this.keyword ='costo';
    this.getPaginator();
  }
  openDialog(id:string, url:string,title:string, table:string){
    Compra.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Compra.delete(id,this.service);
  }
}

