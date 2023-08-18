import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';

import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { DataVendedoresService } from '../../service/data-vendedores.service';
import { Vendedor } from '../../functions/functions';
import { ventasForm } from '../../../../functions/form';
import { FormControl } from '@angular/forms';
@Component({
  // selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  start = 0; //Dato de inicio de la paginación
  limit = 20; //Limite de la pagina
  $vendedores = this.data.vendedores$; //datos de abonos
  items:any[]=[];
  keyword = 'nombre'; // lo que se buscara
  keywords = ['nombre','ventas']; //datos de option de busqueda
  inputTex:any = {'nombre':'Nombre','ventas':'Monto de la venta'}
  info: {[key: string]: any[];} = {nombre:[],ventas:[]};
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.Vendedores.columns;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  totalCount = 0;
  NextPage: any;
  cargar = false;
  cargarInput = false;
  value: any;
  keywordHandlers:any = {
    'nombre': () => {
      this.getPaginator(this.busqueda.value);
    },
    'ventas': () => {
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined, this.value);
    },
    'default': () => {
      this.getPaginator();
    }
  };
  constructor(
    private data:DataVendedoresService, private service: CrudService, private dialog:MatDialog
  ){}
  ngOnInit(): void {
    if(this.service.addCampo == true){
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
  getPaginator(name?: string, salesAmount?: number) {
    this.data.GetPaginator(this.start, this.limit, name, salesAmount).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;
      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
    });
  }
  ListarData() {
    this.$vendedores.subscribe(element =>{
      console.log(element)
      Vendedor.ListaAutoComplete(this.info,element);
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
    this.keyword = 'nombre'
    this.getPaginator();
  }
  openDialog(id:string, url:string,title:string, table:string){
    Vendedor.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Vendedor.delete(id,this.service);
  }
}
