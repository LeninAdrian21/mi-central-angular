import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { DataPromocionesService } from '../../service/data-promociones.service';
import { Promocion } from '../../functions/functions';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  start = 0; //Dato de inicio de la paginación
  limit = 20; //Limite de la pagina
  $promociones = this.data.promociones$; //datos de abonos
  items:any[]=[];
  keyword = 'fecha_creacion'; // lo que se buscara
  keywords = ['fecha_creacion','fecha_vigencia','valor_descuento','codigo_ref','condicion','productos']; //datos de option de busqueda
  inputTex:any = {'fecha_creacion':'Fecha de creacion','fecha_vigencia':'Fecha de vigencia','valor_descuento':'Valor de descuento','codigo_ref':'Codigo de referencia','condicion':'Condicion','productos':'Nombre del producto'}
  info: {[key: string]: any[];} = {'fecha_creacion':[],'fecha_vigencia':[],'valor_descuento':[],'codigo_ref':[],'condicion':[],'productos':[]};
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.Promociones.columns;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  totalCount = 0;
  NextPage: any;
  cargar = false;
  cargarInput = false;
  value: any;
  keywordHandlers:any = {
    'fecha_creacion':()=>{
      // 0
      this.getPaginator(this.busqueda.value);
    },
    'fecha_vigencia':()=>{
      // 1
      this.getPaginator(undefined,this.busqueda.value);
    },
    'valor_descuento':()=>{
      // 2
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined,undefined, this.value);
    },
    'codigo_ref':()=>{
      // 3
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined,undefined,undefined,this.value);
    },
    'condicion':()=>{
      // 4
      this.getPaginator(undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'productos':()=>{
      // 5
      this.getPaginator(undefined,undefined,undefined,undefined,undefined,this.busqueda.value);
    },
    'default': () => {
      this.getPaginator();
    }
  };
  constructor(
    private data:DataPromocionesService, private service: CrudService, private dialog:MatDialog
  ){}
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
    creation_date?: string,
    validity_date?: string,
    discount_value?: any,
    ref_code?: number,
    condition?: string,
    product_name?: string) {
    this.data.GetPaginator(this.start,this.limit,creation_date,validity_date,discount_value,ref_code,condition,product_name).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;
      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
    });
  }
  ListarData() {
    this.$promociones.subscribe(element =>{
      Promocion.ListaAutoComplete(this.info,element);
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
    this.keyword = 'fecha_creacion';
    this.getPaginator();
  }
  openDialog(id:string, url:string,title:string, table:string){
    Promocion.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Promocion.delete(id,this.service);
  }
}
