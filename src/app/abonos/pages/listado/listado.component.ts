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
  keyword = 'cantidad_abono';
  keywords = ['cantidad_abono','fecha_abono','estado_abono','credito','usuario'];
  inputTex:any = {cantidad_abono: 'Cantidad de abono',fecha_abono: 'Fecha de abono',estado_abono: 'Estado de aboo',credito: 'Intereses del credito',usuario: 'Nombre del usuario'};
  info: {[key: string]: any[];} = {cantidad_abono: [],fecha_abono: [], estado_abono: [],credito: [],usuario: []};
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
  /* The `keywordHandlers` object is a collection of functions that are used to handle different search
  keywords in the `Buscador` method. Each function is associated with a specific keyword and is
  responsible for updating the search parameters and calling the `getPaginator` method with the
  updated parameters. */
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
    private data: DataAbonosService,
    private service: CrudService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    /* This code block checks if the `addCampo` property of the `service` object is `true`. If it is
    `true`, it sets `addCampo` to `false` and reloads the current page using `location.reload()`. */
    if (this.service.addCampo == true) {
      this.service.addCampo = false;
      return location.reload();
    }
    this.getPaginator();
    this.ListarData();

    /* The code `this.filteredOptions = this.busqueda.valueChanges.pipe(startWith(''), map(value =>
    this._filter(value || '')))` is setting up an observable that listens for changes in the value
    of the `busqueda` form control. */
    this.filteredOptions = this.busqueda.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    )
  }
  /**
   * The _filter function takes a value and returns an array of options from the info object that match
   * the value.
   * @param {any} value - The `value` parameter is the input value that you want to filter. It can be
   * of any type, but it will be converted to a string before filtering.
   * @returns an array of filtered values from the `this.info[this.keyword]` array. The filtering is
   * done based on whether each option in the array includes the `filterValue`, which is the lowercase
   * string representation of the `value` parameter.
   */
  private _filter(value: any): any[] {
    const filterValue = value.toString().toLowerCase();
    return this.info[this.keyword].filter(option => option.toString().toLowerCase().includes(filterValue));
  }
  /**
   * The function "loadMore" checks if there is a next page and if so, increments the start value and
   * calls the appropriate keyword handler.
   */
  loadMore(){
    const handler = this.keywordHandlers[this.keyword] || this.keywordHandlers['default'];
    if(this.NextPage){
      this.start += this.limit;
      handler();
    }
  }
  /**
   * The `getPaginator` function retrieves data from a server using pagination and updates the local
   * data source.
   * @param {number} [credit_quantity] - The quantity of credit.
   * @param {string} [credit_date] - The credit_date parameter is a string that represents the date of
   * the credit.
   * @param {string} [quantity_payment] - The parameter "quantity_payment" is a string that represents
   * the quantity of payment.
   * @param {number} [credit] - The "credit" parameter is a number that represents the credit amount.
   * It is optional and can be used to filter the data based on the credit amount.
   * @param {string} [user] - The "user" parameter is a string that represents the user for whom the
   * data is being fetched.
   */
  getPaginator(
    credit_quantity?:number,
    credit_date?:string,
    quantity_payment?:string,
    credit?:number,
    user?:string) {
    this.data.GetPaginator(this.start,this.limit, credit_quantity,credit_date,quantity_payment, credit,user).subscribe(({edges, totalCount, pageInfo}) => {
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
  /**
   * The function "ListarData" subscribes to an observable and calls a function "ListaAutoComplete"
   * with the received data.
   */
  ListarData() {
    this.$abonos.subscribe(element =>{
      Funcions.ListaAutoComplete(this.info,element);
    })
  }
  /**
   * The onScrollHandler function is triggered when the user scrolls and checks if the user has reached
   * the bottom of the scrollable element, and if so, it loads more content.
   * @param {any} event - The event parameter is the event object that is passed to the onScrollHandler
   * function. It contains information about the scroll event, such as the target element that
   * triggered the event and the scroll position.
   */
  onScrollHandler(event: any) {
    const miDiv = event.target;
    const pixelsDesplazados = miDiv.scrollTop;
    const pixelsScrollTotal = miDiv.scrollHeight - miDiv.clientHeight ;
    if(parseInt(pixelsDesplazados)+1 == pixelsScrollTotal && this.NextPage || parseInt(pixelsDesplazados) + 2 == pixelsScrollTotal && this.NextPage){
      this.cargar = true;
      setTimeout(() => {
        this.loadMore();
        this.cargar = false;

      }, 1000);
    }
  }
  /**
   * The function "Buscador" is used to search for items based on a keyword and execute a corresponding
   * handler function.
   * @param {any} event - The "event" parameter is an object that represents the event that triggered
   * the search. It could contain information such as the type of event (e.g., button click, key
   * press), the target element that triggered the event, and any additional data associated with the
   * event.
   */
  Buscador(event:any){
    this.start = 0;
    this.limit = 20;
    this.items = [];
    const handler = this.keywordHandlers[this.keyword];
    if (handler) {
      handler(this);
    }
  }
/**
 * The function "Vaciar" resets various variables and properties to their initial values.
 */
  Vaciar(){
    this.start = 0;
    this.limit = 20;
    this.dataSource.data = [];
    this.items = [];
    this.totalCount = 0;
    this.busqueda.reset();
    this.keyword = 'cantidad_abono'
    this.getPaginator();
  }
  /**
   * The function "openDialog" opens a dialog box with the specified ID, URL, title, and table using
   * the "OpenDialog" function from the "Funcions" module.
   * @param {string} id - The id parameter is a string that represents the unique identifier for the
   * dialog. It is used to identify and reference the dialog in the code.
   * @param {string} url - The URL is a string that represents the URL of the dialog component that you
   * want to open. This URL can be a relative or absolute path to the component file.
   * @param {string} title - The title parameter is a string that represents the title of the dialog
   * box.
   * @param {string} table - The "table" parameter is a string that represents the name or identifier
   * of a table. It is likely used as a reference to perform some operations or display data related to
   * that specific table.
   */
  openDialog(id:string, url:string,title:string, table:string){
    Funcions.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
/**
 * The function "Delete" deletes an item with a specific ID from a service and displays a success
 * message.
 * @param {string} id - The parameter "id" is a string that represents the identifier of the item to be
 * deleted.
 */
  Delete(id:string){
    Funcions.delete(id,this.service,'abonos','update_mostrar','Abono eliminado correctamente');
  }
}
