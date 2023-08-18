import { DataLotesService } from './../../service/data-lotes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { table } from 'src/functions/table';
import { CrudService } from 'src/app/services/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { Lote } from '../../functions/functions';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {
  start:number = 0;
  limit:number = 20;
  $lotes = this.data.lotes$;
  items:any[] = [];
  keyword = 'codigo_interno';
  keywords = ['codigo_interno','fecha_arrivo', 'fecha_caducidad','fecha_adquisicion','costo', 'compras', 'products'];
  inputText:any = {
    codigo_interno:'Codigo Interno',
    fecha_arrivo: 'Fecha de Arrivo',
    fecha_caducidad:'Fecha de caducidad',
    fecha_adquisicion:'Fecha de adquisicion',
    costo:'Costo',
    compras:'Costo de la compra',
    products:'Nombre del producto'
  };
  info: {[key: string]: any[];} = {
    codigo_interno: [],
    fecha_arrivo: [],
    fecha_caducidad: [],
    fecha_adquisicion: [],
    costo: [],
    compras:[],
    products:[]
  };
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.Lotes.columns;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  totalCount = 0;
  NextPage:any;
  cargar = false;
  cargarInput = false;
  value:any;
  keywordHandlers:any = {
    codigo_interno: () => {
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(this.value);
    },
    fecha_arrivo: () => {
      this.getPaginator(undefined, this.busqueda.value);
    },
    fecha_caducidad: () => {
      this.getPaginator(undefined, undefined, this.busqueda.value);
    },
    fecha_adquisicion: () => {
      this.getPaginator(undefined, undefined,undefined, this.busqueda.value);
    },
    costo: () => {
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined, undefined, undefined, undefined,this.value);
    },
    compras: () => {
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined, undefined, undefined,undefined,undefined, this.value);
    },
    products: () => {
      this.getPaginator(undefined, undefined, undefined, undefined,undefined,undefined,this.busqueda.value);
    },
    default: () => {
      this.getPaginator();
    }
  };
  constructor(private data:DataLotesService, private service: CrudService, private dialog:MatDialog ){}
  ngOnInit(): void {
    if(this.service.addCampo == true){
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
    return this.info[this.keyword].filter((option:any) => option.toString().toLowerCase().includes(filterValue));
  }
  getPaginator(
    internal_code?: number,
    arrival_date?: string,
    expiration_date?: string,
    acquisition_date?: string,
    cost?: any,
    shopping_cost?:number,
    product_name?:string){
      this.data.GetPaginator(this.start, this.limit, internal_code, arrival_date, expiration_date,acquisition_date, cost,shopping_cost,product_name).subscribe(
        ({edges, totalCount, pageInfo})=>{
          this.totalCount = totalCount;
          this.NextPage = pageInfo.hasNextPage;
          edges.forEach((item:any) => this.items.push(item.node))
          this.dataSource.data = this.items;
        }
      )
  }
  ListarData(){
    this.$lotes.subscribe(element=>{
      Lote.ListaAutoComplete(this.info,element)
    })
  }
  onScrollHandler(event: any) {
    const miDiv = event.target;
    const pixelsDesplazados = miDiv.scrollTop;
    const pixelsScrollTotal = miDiv.scrollHeight - miDiv.clientHeight;
    if(parseInt(pixelsDesplazados) + 1 == pixelsScrollTotal && this.NextPage || parseInt(pixelsDesplazados) + 2 == pixelsScrollTotal && this.NextPage){
      this.cargar = true;
      setTimeout(() => {
        // this.cargar = true;
        this.loadMore();
        this.cargar = false;
      }, 1000);
    }
  }
  loadMore(){
    const hadler = this.keywordHandlers[this.keyword] || this.keywordHandlers['default'];
    if(this.NextPage){
      this.start += this.limit;
      hadler();
    }
  }
  Buscador(event:any){
    this.start = 0;
    this.limit = 20;
    this.items = [];
    const hadler = this.keywordHandlers[this.keyword];
    if(hadler){
      hadler();
    }
  }
  Vaciar(){
    this.start = 0;
    this.limit = 20;
    this.dataSource.data = [];
    this.items = [];
    this.totalCount = 0;
    this.busqueda.reset();
    this.keyword = 'codigo_interno';
    this.getPaginator();
  }
  openDialog(id:string, url:string,title:string, table:string){
    Lote.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Lote.delete(id,this.service);
  }

}
