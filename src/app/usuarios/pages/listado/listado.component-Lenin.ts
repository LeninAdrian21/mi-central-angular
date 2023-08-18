import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { CrudService } from 'src/app/services/crud.service';
import { GetdataService } from 'src/app/services/getdata.service';
import { table } from 'src/functions/table';
import { Usuario } from '../../functions/functions';
import { DataUsuariosService } from '../../service/data-usuarios.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})

export class ListadoComponent implements OnInit {
  start = 0; //Dato de inicio de la paginación
  limit = 20; //Limite de la pagina
  $usuarios = this.data.usuarios$; //datos de abonos
  items:any[]=[];
  keyword = 'nombre'; // lo que se buscara
  keywords = ['nombre','ap_paterno','ap_materno','fecha_nacimiento','genero','fecha_inscripcion','fecha_alta','rfc','curp','nss','tel_cel','tel_cel3','email','tipo_sangre','licencia','alergias','padecimientos','nacionalidad','calle','numero','colonia','cp','municipio','ciudad','pais','referencia_direccion','comment','status',
  // 'status2',
  'tipo_rol','abonos','carritos','compras','creditos','gastos','historiales','locals','metodo_pagos','ventas','camiones']; //datos de option de busqueda
  inputTex:any = {nombre:'Nombre',ap_paterno:'Apellido paterno',ap_materno:'Apellido materno',fecha_nacimiento:'Fecha de nacimiento',genero:'Genero',fecha_inscripcion:'Fecha de inscripcion',fecha_alta:'Fecha de alta',rfc:'RFC',curp:'CURP',nss:'Numero de seguro social',tel_cel:'Telefono celular',tel_cel3:'Telefono Celular',email:'Email',tipo_sangre:'Tipo de sangre',licencia:'Licencia',alergias:'Alergias',padecimientos:'Padecimientos',nacionalidad:'Nacionalidad',calle:'Calle',numero:'Numero',colonia:'Colonia',cp:'Codigo postal',municipio:'Municipio',ciudad:'Ciudad',pais:'Pais',referencia_direccion:'Referencia de direccion',comment:'Comentarios',status:'status',
  // status2:'status2',
  tipo_rol:'Tipo de rol',abonos:'Cantidad de abono',carritos:'Cantidad de carrito',compras:'Costo de la compra',creditos:'Limite de credito',gastos:'Descripcion de gastos',historiales:'Fecha del historial',locals:'Nombre del local',metodo_pagos:'Nombre del titular',ventas:'Monto de la venta',camiones:'Numero de serie del camion'}
  info: {[key: string]: any[];} = {nombre:[],ap_paterno:[],ap_materno:[],fecha_nacimiento:[],genero:[],fecha_inscripcion:[],fecha_alta:[],rfc:[],curp:[],nss:[],tel_cel:[],tel_cel3:[],email:[],tipo_sangre:[],licencia:[],alergias:[],padecimientos:[],nacionalidad:[],calle:[],numero:[],colonia:[],cp:[],municipio:[],ciudad:[],pais:[],referencia_direccion:[],comment:[],status:[],status2:[],tipo_rol:[],abonos:[],carritos:[],compras:[],creditos:[],gastos:[],historiales:[],locals:[],metodo_pagos:[],ventas:[],camiones:[]};
  busqueda = new FormControl('');
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns:string[] = table.Usuarios.columns;
  filteredOptions: Observable<any[]> = new Observable<any[]>();
  totalCount = 0;
  NextPage: any;
  cargar = false;
  cargarInput = false;
  value: any;
  keywordHandlers:any = {
    nombre: () => {
      // 0
      this.getPaginator(this.busqueda.value);
    },
    ap_paterno: () => {
      // 1
      this.getPaginator(undefined, this.busqueda.value);
    },
    ap_materno: () => {
      // 2
      this.getPaginator(undefined, undefined, this.busqueda.value);
    },
    fecha_nacimiento: () => {
      // 3
      this.getPaginator(undefined, undefined, undefined, this.busqueda.value);
    },
    genero: () => {
      // 4
      this.getPaginator(undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    fecha_inscripcion: () => {
      // 5
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    fecha_alta: () => {
      // 6
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    rfc: () => {
      // 7
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    curp: () => {
      // 8
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    nss: () => {
      // 9
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    tel_cel: () => {
      // 10
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.value);
    },
    tel_cel3: () => {
      // 11
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    email: () => {
      // 12
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    tipo_sangre: () => {
      // 13
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    licencia: () => {
      // 14
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    alergias: () => {
      // 15
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    padecimientos: () => {
      // 16
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    nacionalidad: () => {
      // 17
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    calle: () => {
      // 18
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,undefined, undefined, this.busqueda.value);
    },
    numero: () => {
      // 19
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,this.value);
    },
    colonia: () => {
      // 20
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,undefined, undefined, this.busqueda.value);
    },
    cp: () => {
      // 21
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.value);
    },
    municipio: () => {
      // 22
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,this.busqueda.value);
    },
    ciudad: () => {
      // 23
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    pais: () => {
      // 24
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    referencia_direccion: () => {
      // 25
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    comment: () => {
      // 26
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,this.busqueda.value);
    },
    status: () => {
      // 27
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,  undefined, undefined, this.busqueda.value);
    },
    // status2: () => {
    //   // 28
    //   this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    // },

    tipo_rol: () => {
      // 29
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    abonos: () => {
      // 30
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.value);
    },
    carritos: () => {
      // 31
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.value);
    },
    compras: () => {
      // 32
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,  this.value);
    },
    creditos: () => {
      // 33
      this.value = parseInt(this.busqueda.value);
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.value);
    },
    gastos: () => {
      // 34
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    historiales: () => {
      // 35
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    locals: () => {
      // 36
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    metodo_pagos: () => {
      // 37
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    ventas: () => {
      // 38
      this.value = parseFloat(this.busqueda.value);
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.value);
    },
    camiones: () => {
      // 39
      this.getPaginator(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.busqueda.value);
    },
    'default': () => {
      this.getPaginator();
    }
  };
  constructor(
    private data:DataUsuariosService,
    private service: CrudService,
    private dialog:MatDialog
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
  getPaginator(
    name?: string,
    last_name?: string,
    mother_last_name?: string,
    birthdate?: string,
    gender?: string,
    registration_date?: string,
    enrollment_date?: string,
    rfc?: string,
    curp?: string,
    nss?: string,
    phone?: number,
    phone3?: string,
    email?: string,
    blood_type?: string,
    license?: string,
    allergies?: string,
    conditions?: string,
    nationality?: string,
    street?: string,
    number?: number,
    neighborhood?: string,
    zip_code?: number,
    municipality?: string,
    city?: string,
    country?: string,
    address_reference?: string,
    comment?: string,
    status?: boolean,
    status2?: string,
    role_type?: string,
    payments_amount?: number,
    carts_quantity?: number,
    purchases_cost?: number,
    credits_limit?: number,
    expenses_description?: string,
    histories_date?: string,
    locals_name?: string,
    payment_methods_holder?: string,
    sales_amount?: number,
    trucks_serial_number?: string) {
    this.data.GetPaginator(this.start,this.limit, name,last_name,mother_last_name,birthdate,gender,registration_date,enrollment_date,rfc,curp,nss,phone,phone3,email,blood_type,license,allergies,conditions,nationality,street,number,neighborhood,zip_code,municipality,city,country,address_reference,comment,status,status2,role_type,payments_amount,carts_quantity,purchases_cost,credits_limit,expenses_description,histories_date,locals_name,payment_methods_holder,sales_amount,trucks_serial_number).subscribe(({edges, totalCount, pageInfo}) => {
      this.totalCount = totalCount;
      this.NextPage = pageInfo.hasNextPage;
      edges.forEach((item: any) => this.items.push(item.node));
      this.dataSource.data = this.items;
    });
  }
  ListarData() {
    this.$usuarios.subscribe(element =>{
      Usuario.ListaAutoComplete(this.info,element);
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
    Usuario.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    Usuario.delete(id,this.service);
  }
}
