import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataGastosService } from '../../service/data-gastos.service';
import { Gasto } from '../../functions/functions';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  // filter:any;
  // $gastos = this.data.gastos$;
  // dataGastos:any[] = [];
  // displayedColumns:string[] = table.Gastos.columns;
  // dataSource = new MatTableDataSource<any>([]);
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  start = 0; //Dato de inicio de la paginación
  limit = 2; //Limite de la pagina
  $gastos = this.data.gastos$; //datos de abonos
  items:any[]=[];
  keyword = 'descripcion'; // lo que se buscara
  keywords = ['descripcion','fecha','monto','categoria','status','usuario','camions']; //datos de option de busqueda
  inputTex:any = {'descripcion':'Descripcion','fecha':'Fecha','monto':'Monto','categoria':'Categoria','status':'Status','usuario':'Usuario','camions':'Camiones'}
  info: {[key: string]: any[];} = {descripcion:[],fecha:[],monto:[],categoria:[],status:[],usuario:[],camions:[]};
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.Gastos.columns;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  totalCount = 0;
  NextPage: any;
  cargar = false;
  cargarInput = false;
  value: any;
  keywordHandlers:any = {
    'descripcion': () => {
      this.getPaginator(this.busqueda.value);
    },
    'fecha': () => {
      this.getPaginator(undefined, this.busqueda.value);
    },
    'monto': () => {
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined, undefined,this.value);
    },
    'categoria': () => {
      this.getPaginator(undefined,undefined,undefined,this.busqueda.value);
    },
    'status': () => {
      this.getPaginator(undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'usuario': () => {
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'camions': () => {
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'default': () => {
      this.getPaginator();
    }
  };
  constructor(private data:DataGastosService, private service: CrudService, private dialog:MatDialog ){}
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
    date?: string,
    amount?: any,
    categoria?: string,
    status?: boolean,
    user?: string,
    trucks ?: string) {
    this.data.GetPaginator(this.start,this.limit,description,date,amount,categoria,status,user,trucks ).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;

      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
      console.log('data',this.items)
      console.log(this.totalCount)
    });
  }
  ListarData() {
    this.$gastos.subscribe(element =>{
      Gasto.ListaAutoComplete(this.info,element);
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
    this. keyword = 'descripcion';
    this.getPaginator();
  }
  openDialog(id:string, url:string,title:string, table:string){
    Gasto.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Gasto.delete(id,this.service);
  }
}
