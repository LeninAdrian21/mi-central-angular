import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { table } from 'src/functions/table';
import { DataAbonosService } from '../../service/data-abonos.service';
import { CrudService } from 'src/app/services/crud.service';
import { MatDialog } from '@angular/material/dialog';
// import { Abono } from '../../function/functions';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { Funcions, Mensaje } from 'src/functions/functions';
import { VariablesService } from 'src/app/core/services/variables.service';
import { FilterComponent } from 'src/app/filter/filter.component';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  start = 0;
  limit = 20;
  $abonos = this.data.abonos$;
  items:any[]=[];
  // keyword = 'cantidad_abono';
  // keywords = ['cantidad_abono','fecha_abono','estado_abono','credito','usuario'];
  // inputTex:any = {cantidad_abono: 'Cantidad de abono',fecha_abono: 'Fecha de abono',estado_abono: 'Estado de aboo',credito: 'Intereses del credito',usuario: 'Nombre del usuario'};
  // info: {[key: string]: any[];} = {cantidad_abono: [],fecha_abono: [], estado_abono: [],credito: [],usuario: []};
  addCampo:any;
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.Abonos.columns;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  totalCount = 0;
  NextPage: any;
  cargar = false;
  cargarInput = false;
  value: any;
  // keywordHandlers:any = {
  //   'cantidad_abono': () => {
  //     this.value = parseInt(this.busqueda.value);
  //     this.getPaginator(this.value);
  //   },
  //   'fecha_abono': () => {
  //     this.getPaginator(undefined, this.busqueda.value);
  //   },
  //   'estado_abono': () => {
  //     this.getPaginator(undefined, undefined, this.busqueda.value);
  //   },
  //   'credito': () => {
  //     this.value = parseInt(this.busqueda.value);
  //     this.getPaginator(undefined, undefined, undefined, this.value);
  //   },
  //   'usuario': () => {
  //     this.getPaginator(undefined, undefined, undefined, undefined, this.busqueda.value);
  //   },
  //   'default': () => {
  //     this.getPaginator();
  //   }
  // };

  constructor(
    private data: DataAbonosService,
    private service: CrudService,
    private dialog: MatDialog,
    private variables:VariablesService
  ) { }

  ngOnInit(): void {
    if (this.service.addCampo == true) {
      this.service.addCampo = false;
      return location.reload();
    }
    this.getPaginator();
    this.ListarData();
    // this.filteredOptions = this.busqueda.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || ''))
    // )
  }

  // private _filter(value: any): any[] {
  //   const filterValue = value.toString().toLowerCase();
  //   return this.info[this.keyword].filter(option => option.toString().toLowerCase().includes(filterValue));
  // }

  // loadMore(){
  //   const handler = this.keywordHandlers[this.keyword] || this.keywordHandlers['default'];
  //   if(this.NextPage){
  //     this.start += this.limit;
  //     handler();
  //   }
  // }
  getPaginator() {
    this.data.GetPaginator(this.start,this.limit).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo?.hasNextPage;
      if(edges){
        edges.forEach((item: any) => this.items.push(item.node));
        this.dataSource.data = this.items;
      }
    },
    (error: any) => {
      Mensaje('Se produjo un error al cargar los datos.');
    }
    );
  }
  ListarData() {
    this.$abonos.subscribe((element: any) =>{
      this.variables.FilterObservableData = element;
      // Funcions.ListaAutoComplete(this.info,element);
    })
  }
  onScrollHandler(event: any) {
    const miDiv = event.target;
    const pixelsDesplazados = miDiv.scrollTop;
    const pixelsScrollTotal = miDiv.scrollHeight - miDiv.clientHeight ;
    if(parseInt(pixelsDesplazados)+1 == pixelsScrollTotal && this.NextPage || parseInt(pixelsDesplazados) + 2 == pixelsScrollTotal && this.NextPage){
      this.cargar = true;
      setTimeout(() => {
        // this.loadMore();
        this.cargar = false;

      }, 1000);
    }
  }
  // Buscador(event:any){
  //   this.start = 0;
  //   this.limit = 20;
  //   this.items = [];
  //   const handler = this.keywordHandlers[this.keyword];
  //   if (handler) {
  //     handler(this);
  //   }
  // }
  // Vaciar(){
  //   this.start = 0;
  //   this.limit = 20;
  //   this.dataSource.data = [];
  //   this.items = [];
  //   this.totalCount = 0;
  //   this.busqueda.reset();
  //   this.keyword = 'cantidad_abono'
  //   this.getPaginator();
  // }
  openDialog(id:string, url:string,title:string, table:string){
    const data = {
      id,url,title,table
    }
    Funcions.Dialog(this.dialog,DialogcomponentComponent,'550px','500px',data);
  }
  Filter(){
    this.ListarData();
    const data = {
      collection: 'abonos'
    }
    const dialog = Funcions.Dialog(this.dialog, FilterComponent,'700px','1250px',data);
  }
  Export(){}
  Delete(id:string){
    Funcions.delete(id,this.service,'abonos','update_mostrar','Abono eliminado correctamente');
  }
}
