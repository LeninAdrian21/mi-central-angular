import { Component, OnInit, ViewChild } from '@angular/core';
import { table } from 'src/functions/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from 'src/app/services/crud.service';
import { DataCarritosService } from '../../service/data-carritos.service';
import { Carrito } from '../../functions/functions';
import { DialogcomponentComponent } from '../../../dialogcomponent/dialogcomponent.component';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  // filter:any;
  // $carritos = this.data.carritos$;
  // dataCarritos:any[]=[];
  // displayedColumns:string[] = table.Carritos.columns;
  // dataSource = new MatTableDataSource<any>([]);
  // @ViewChild(MatPaginator) paginator!:MatPaginator;
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  start = 0; //Dato de inicio de la paginación
  limit = 20; //Limite de la pagina
  $carritos = this.data.carritos$; //datos de abonos
  items:any[]=[];
  keyword = 'cantidad'; // lo que se buscara
  keywords = ['cantidad','productos','usuario','venta']; //datos de option de busqueda
  inputTex:any = {'cantidad':'Cantidad','productos':'Productos','usuario':'Usuario','venta':'Venta'}
  info: {[key: string]: any[];} = {cantidad:[],productos:[],usuario:[],venta:[]};
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.Carritos.columns;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  totalCount = 0;
  NextPage: any;
  cargar = false;
  cargarInput = false;
  value: any;
  keywordHandlers:any = {
    'cantidad': () => {
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(this.value);
    },
    'productos': () => {
      this.getPaginator(undefined, this.busqueda.value);
    },
    'usuario': () => {
      this.getPaginator(undefined, undefined, this.busqueda.value);
    },
    'venta': () => {
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined, undefined, undefined, this.value);
    },
    'default': () => {
      this.getPaginator();
    }
  };
  constructor(
    private data:DataCarritosService,
    private service: CrudService,
    private dialog: MatDialog) {}
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
    amount?:number,
    products?: string,
    user?: string,
    sale?:any) {
    this.data.GetPaginator(this.start,this.limit,amount,products,user,sale).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;

      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
      console.log('data',this.items)
      console.log(this.totalCount)
    });
  }
  ListarData() {
    this.$carritos.subscribe(element =>{
      Carrito.ListaAutoComplete(this.info,element);
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
    this.keyword ='cantidad';
    this.getPaginator();
  }
  openDialog(id:string,url:string,title:string,table:string){
    Carrito.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent)
  }
  Delete(id:string){
    Carrito.delete(id,this.service);
  }
}
