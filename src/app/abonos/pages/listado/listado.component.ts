import { Component,Inject,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { DataAbonosService } from '../../service/data-abonos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Abono } from '../../function/functions';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { Observable, map } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
  providers: [CrudService, DataAbonosService],
})
export class ListadoComponent implements OnInit {
  start = 0; //Dato de inicio de la paginación
  limit = 2; //Limite de la pagina
  $abonos = this.data.abonos$; //datos de abonos
  items:any[]=[];
  keyword = 'cantidad_abono'; // lo que se buscara
  keywords = ['cantidad_abono','fecha_abono','estado_abono','credito','usuario']; //datos de option de busqueda
  inputTex:any = {'cantidad_abono': 'Cantidad de abono','fecha_abono': 'Fecha de abono','estado_abono': 'Estado de aboo','credito': 'Intereses del credito','usuario': 'Nombre del usuario'}
  info: {[key: string]: any[];} = {cantidad_abono: [],fecha_abono: [], estado_abono: [],credito: [],usuario: []};
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.Abonos.columns;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  totalCount = 0;
  NextPage: any;
  cargar = false;
  cargarInput = false;
  value: any;
  keywordHandlers:any = {
    'cantidad_abono': () => {
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(this.value);
    },
    'fecha_abono': () => {
      this.getPaginator(undefined, this.busqueda.value);
    },
    'estado_abono': () => {
      this.getPaginator(undefined, undefined, this.busqueda.value);
    },
    'credito': () => {
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined, undefined, undefined, this.value);
    },
    'usuario': () => {
      this.getPaginator(undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    'default': () => {
      this.getPaginator();
    }
  };
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private data: DataAbonosService,
    private service: CrudService,
    private dialog: MatDialog,
  ) {}
  ngOnInit() {
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
    credit_quantity?:number,
    credit_date?:string,
    quantity_payment?:string,
    credit?:number,
    user?:string) {
    this.data.GetPaginator(this.start,this.limit, credit_quantity,credit_date,quantity_payment, credit,user).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;

      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
      console.log('data',this.items)
      console.log(this.totalCount)
    });
  }
  ListarData() {
    this.$abonos.subscribe(element =>{
      Abono.ListaAutoComplete(this.info,element);
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
  openDialog(id:string, url:string,title:string, table:string){
    Abono.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Abono.delete(id,this.service);
  }
}
