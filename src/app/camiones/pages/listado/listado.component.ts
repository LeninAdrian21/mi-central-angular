import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/app/dialogcomponent/functions/functions';
import { Camion } from '../../functions/functions';
import { DataCamionesService } from '../../service/data-camiones.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  // start = 0;
  // limit = 2;
  // $camiones = this.data.camiones$;
  // filter:any;
  // $camiones = this.data.camiones$;
  // dataCamiones:any[] =[];
  // displayedColumns: string[] = table.Camiones.columns;
  // dataSource = new MatTableDataSource<any>([]);
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  start = 0; //Dato de inicio de la paginación
  limit = 2; //Limite de la pagina
  $camiones= this.data.camiones$; //datos de abonos
  items:any[]=[];
  keyword = 'placas'; // lo que se buscara
  keywords = ['placas','estado','placa_activa','num_serie','historial','niv','rutas','usuario','gastos']; //datos de option de busqueda
  inputTex:any = {'placas':'Placas','estado':'Estado','placa_activa':'Placa activa','num_serie':'Numero de serie','historial':'Historial','niv':'Niv','rutas':'Ruta','usuario':'Usuario','gastos':'Gastos'}
  info: {[key: string]: any[];} = {placas:[],estado:[],placa_activa:[],num_serie:[],historial:[],niv:[],rutas:[],usuario:[],gastos:[]};
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.Camiones.columns;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  totalCount = 0;
  NextPage: any;
  cargar = false;
  cargarInput = false;
  value: any;
  keywordHandlers:any = {
    'placas': () => {
      this.getPaginator(this.busqueda.value);
    },
    'estado': () => {
      this.getPaginator(undefined,this.busqueda.value);
    },
    'placa_activa': () => {
      this.getPaginator(undefined,undefined,this.busqueda.value);
    },
    'num_serie': () => {
      this.getPaginator(undefined,undefined,undefined,this.busqueda.value);
    },
    'niv': () => {
      this.getPaginator(undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    'ruta': () => {
      this.getPaginator(undefined, undefined, undefined, undefined,undefined, this.busqueda.value);
    },
    'usuario': () => {
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);//String
    },
    'gastos': () => {
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);//String
    },
    'default': () => {
      this.getPaginator();
    }
  };
  constructor(private data:DataCamionesService, private service: CrudService,private dialog: MatDialog) { }

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
    plaque?: string,
    state?: string,
    plaque_active?: boolean,
    num_serial?: string,
    record?:string,
    niv?: string,
    destination?: string,
    driver?: string,
    spent?: string,){
    this.data.GetPaginator(this.start,this.limit,plaque,state,plaque_active,num_serial,record,niv,destination,driver,spent,).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;

      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
      console.log('data',this.items)
      console.log(this.totalCount)
    });
  }
  ListarData() {
    this.$camiones.subscribe(element =>{
      Camion.ListaAutoComplete(this.info,element);
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
    this.keyword = 'placas'; 
    this.getPaginator();
  }
  openDialog(id:string, url:string, title:string, table:string){
    Camion.openDialog(id,url,title,table,this.dialog,DialogcomponentComponent)
  }
  Delete(id:string){
    Camion.delete(id,this.service);
  }
}
