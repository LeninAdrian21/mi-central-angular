import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataCreditosService } from '../../service/data-creditos.service';
import { Credito } from '../../functions/functions';
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
  $creditos = this.data.creditos$; //datos de abonos
  items:any[]=[];
  keyword = 'limite'; // lo que se buscara
  keywords = ['limite','fecha_alta','fecha_baja','vigencia','intereses','status','status2','abonos','metodo_pago','usuario']; //datos de option de busqueda
  inputTex:any = {'limite':'limite','fecha_alta':'fecha de alta','fecha_baja':'fecha de baja','vigencia':'vigencia','intereses':'intereses','status':'Status','status2':'Status2','abonos':'Abonos','metodo_pago':'metodo de pago','usuario':'Usuario'}
  info: {[key: string]: any[];} = {limite:[],fecha_alta:[],fecha_baja:[],vigencia:[],intereses:[],status:[],status2:[],abonos:[],metodo_pago:[],usuario:[]};
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.Creditos.columns;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  totalCount = 0;
  NextPage: any;
  cargar = false;
  cargarInput = false;
  value: any;
  keywordHandlers:any = {
    'limite': () => {
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(this.value);
    },
    'fecha_alta': () => {
      this.getPaginator(undefined,this.busqueda.value);
    },
    ' fecha_baja': () => {
      this.getPaginator(undefined,undefined,this.busqueda.value);
    },
    'vigencia': () => {
      this.getPaginator(undefined,undefined,undefined,this.busqueda.value);
    },
    'intereses': () => {
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,this.value);
    },
    'status': () => {
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'status2': () => {
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);//String
    },
    'abonos': () => {
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'metodo_pago': () => {
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.value);
    },
    'usuario': () => {
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,this.busqueda.value);//String
    },
    'default': () => {
      this.getPaginator();
    }
    // 'cantidad_abono': () => {
    //   this.value = parseInt(this.busqueda.value);
    //   this.getPaginator(this.value);
    // },
    // 'fecha_abono': () => {
    //   this.getPaginator(undefined, this.busqueda.value);
    // },
    // 'estado_abono': () => {
    //   this.getPaginator(undefined, undefined, this.busqueda.value);
    // },
    // 'credito': () => {
    //   this.value = parseInt(this.busqueda.value);
    //   this.getPaginator(undefined, undefined, undefined, this.value);
    // },
    // 'usuario': () => {
    //   this.getPaginator(undefined, undefined, undefined, undefined, this.busqueda.value);
    // },
  };
  constructor(private data:DataCreditosService, private service: CrudService, private dialog:MatDialog) { }
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
    end?: any,
    high_date?: string,
    low_date?: string,
    validity?: string,
    interests?: any,
    status?: boolean,
    statud2?: string,
    payments?: any,
    payment_method?: any,
    user?: string ){
    this.data.GetPaginator(this.start,this.limit,end,high_date,low_date,validity,interests,status,statud2,payments,payment_method,user,).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;
      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
    });
  }
  ListarData() {
    this.$creditos.subscribe(element =>{
      Credito.ListaAutoComplete(this.info,element);
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
    this.keyword = 'limite';
    this.getPaginator();
  }
  openDialog(id:string, url:string,title:string, table:string){
    Credito.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Credito.delete(id,this.service);
  }

}