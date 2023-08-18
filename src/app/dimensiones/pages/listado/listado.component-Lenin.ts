import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { DataDimensionesService } from '../../service/data-dimensiones.service';
import { Dimension } from '../../functions/functions';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  // filter:any;
  // $dimensiones = this.data.dimensiones$;
  // dataDimensiones:any[] = [];
  // displayedColumns:string[] = table.Dimensiones.columns;
  // dataSource = new MatTableDataSource<any>([]);
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  start = 0; //Dato de inicio de la paginación
  limit = 2; //Limite de la pagina
  $dimensiones = this.data.dimensiones$; //datos de abonos
  items:any[]=[];
  keyword = 'nombre'; // lo que se buscara
  keywords = ['nombre','ancho','alto','largo','productos']; //datos de option de busqueda
  inputTex:any = {'nombre':'Nombre','ancho':'Ancho','alto':'Alto','largo':'Largo','productos':'Productos'}
  info: {[key: string]: any[];} = {nombre:[],ancho:[],alto:[],largo:[],productos:[]};
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.Dimensiones.columns;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  totalCount = 0;
  NextPage: any;
  cargar = false;
  cargarInput = false;
  value: any;
  keywordHandlers:any = {
    'nombre':() =>{
      this.getPaginator(this.busqueda.value);
    },
    'ancho':() =>{
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined,this.value);
    },
    'alto':() =>{
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined,undefined,this.value);
    },
    'largo':() =>{
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,this.value);
    },
    'productos':() =>{
      this.getPaginator(undefined,undefined,undefined,undefined, this.busqueda.value);
    },
    'default': () => {
      this.getPaginator();
    }
    
  };
  constructor( private data:DataDimensionesService, private service: CrudService, private dialog:MatDialog) { }
  ngOnInit(): void {
    // if(this.service.addCampo == true){
    //   this.service.addCampo = false;
    //   return location.reload();
    // }
    // this.Listar();
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
    name ?: string,
    width?: any,
    high?: any,
    long?: any,
    products?: string) {
    this.data.GetPaginator(this.start,this.limit,name,width,high,long,products).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;

      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
      console.log('data',this.items)
      console.log(this.totalCount)
    });
  }
  ListarData() {
    this.$dimensiones.subscribe(element =>{
      Dimension.ListaAutoComplete(this.info,element);
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
  openDialog(id: string, url: string, title: string, table: string) {
    Dimension.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Dimension.delete(id,this.service);
  }
}
