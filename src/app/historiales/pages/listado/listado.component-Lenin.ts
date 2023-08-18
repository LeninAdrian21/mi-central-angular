import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { table } from 'src/functions/table';
import { CrudService } from '../../../services/crud.service';
import { Historial } from '../../functions/functions';
import { DataHistorialesService } from '../../service/data-historiales.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  // filter:any;
  // $historiales = this.data.historiales$;
  // dataHistoriales:any[] = [];
  // displayedColumns:string[] = table.Historiales.columns;
  // dataSource = new MatTableDataSource<any>([]);
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  start = 0; //Dato de inicio de la paginación
  limit = 2; //Limite de la pagina
  $historiales = this.data.historiales$; //datos de abonos
  items:any[]=[];
  keyword = 'fecha'; // lo que se buscara
  keywords = ['fecha','hora_inicio','hora_fin','status','status2','camiones','usuario']; //datos de option de busqueda
  inputTex:any = {'fecha':'Fecha','hora_inicio':'Hora de inicio','hora_fin':'Hora final','status':'Status','status2':'Status2','camiones':'Camiones','usuario':'Usuario'}
  info: {[key: string]: any[];} = {fecha:[],hora_inicio:[],hora_fin:[],status:[],status2:[],camiones:[],usuario:[]};
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.Historiales.columns;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  totalCount = 0;
  NextPage: any;
  cargar = false;
  cargarInput = false;
  value: any;
  keywordHandlers:any = {
    'fecha': () => {
      this.getPaginator(this.busqueda.value);
    },
    'hora_inicio': () => {
      this.getPaginator(undefined, this.busqueda.value);
    },
    'hora_fin': () => {
      this.getPaginator(undefined, undefined, this.busqueda.value);
    },
    'status': () => {
      this.getPaginator(undefined, undefined,undefined, this.busqueda.value);
    },
    'status2': () => {
      this.getPaginator(undefined, undefined,undefined,undefined,this.busqueda.value);
    },
    'camiones': () => {
      this.getPaginator(undefined, undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'usuario': () => {
      this.getPaginator(undefined, undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'default': () => {
      this.getPaginator();
    }
  };
  constructor(
    private data:DataHistorialesService,
    private service:CrudService,
    private dialog:MatDialog
  ) { }
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
    date?: string,
    start_time?: string,
    end_time?: string,
    status?: boolean,
    status2?: string,
    trucks?: string,
    user?: string) {
    this.data.GetPaginator(this.start,this.limit,date,start_time,end_time,status,status2,trucks,user).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;

      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
      console.log('data',this.items)
      console.log(this.totalCount)
    });
  }
  ListarData() {
    this.$historiales.subscribe(element =>{
      Historial.ListaAutoComplete(this.info,element);
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
    this.keyword = 'fecha';
    this.getPaginator();
  }
  openDialog(id:string, url:string,title:string, table:string){
    Historial.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Historial.delete(id,this.service);
  }

}
