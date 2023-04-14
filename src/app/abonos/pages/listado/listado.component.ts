import { Component, ElementRef, HostBinding, HostListener, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from 'src/app/services/crud.service';
import { table } from 'src/functions/table';
import { DataAbonosService } from '../../service/data-abonos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Abono } from '../../function/functions';
import { DialogcomponentComponent } from 'src/app/dialogcomponent/dialogcomponent.component';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = table.Abonos.columns;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  start = 0;
  limit = 2;
  items:any[]=[];
  totalCount:any;
  @ViewChild('myTable') myTable!: ElementRef ;
  // sin cambio
  // data$:Observable<any> | undefined;
  // filter:any;
  // $abonos = this.data.abonos$;
  dataAbonos:any[] = [];
  // refresh:any = localStorage.getItem('refresh');
  // displayedColumns:string[] = table.Abonos.columns;
  // dataSource = new MatTableDataSource<any>([]);
  // hasNextPage!:boolean ;
  // hasPreviousPage!:boolean;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  constructor(private data:DataAbonosService, private service: CrudService, private dialog:MatDialog, private elementRef: ElementRef){
  }

  getItems(){
    this.data.GetPaginator(this.start,this.limit).subscribe(({edges, totalCount}) => {
      this.totalCount = totalCount;
      edges.forEach((item: any) => this.items.push(item.node));
      console.log(this.items);
      this.dataSource.data = this.items;
    });
  }
  loadMore(){
    this.start += this.limit;
    console.log(this.items.length)
    console.log(this.totalCount)
    if(this.items.length != this.totalCount){
      this.getItems();
    }
     else{
    }
  }
  // @HostListener('window:scroll',['$event'])
  // onScroll(event:any){
  //   const element = this.elementRef.nativeElement;
  //   const bottom = element.querySelector('#bottom');
  //   if (bottom.getBoundingClientRect().top <= window.innerHeight) {
  //     this.loadMore();
  //   }
  // }
  ngOnInit(): void {
    this.Paginator()
    this.getItems();

    // sin cambios
    // console.log()
    // if(this.service.addCampo == true){
    //   this.service.addCampo = false;
    //   return location.reload();
    // }
    // this.Listar();
    // this.Paginator();
    // console.log(this.dataSource.paginator );
    // this.data.GetPaginator(2,2).subscribe(result=>{
    //   this.hasNextPage = result.pageInfo.hasNextPage;
    //   this.hasPreviousPage = result.pageInfo.hasPreviousPage;
    // });
    // console.log(this.hasNextPage)
    // console.log(this.hasPreviousPage)
  }
  @HostListener("window:scroll")
  Scroll():void{
    console.log((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.loadMore()
    }
  }
  applyFilter(event:any){
    // Abono.ApplyFilter(event,this.dataSource)
  }
  Refresh(){
    // this.dataSource.data = this.dataAbonos;
    // this.filter = '';
  }
  Listar(){
    // this.$abonos.subscribe(element =>{
    //   element.forEach((element:any, index:any) => {
    //     let data = {
    //       no:index + 1,
    //       id:element.id,
    //       cantidad_abono:element.cantidad_abono,
    //       fecha_abono:Abono.Fecha(element.fecha_abono),
    //       estado_abono:element.estado_abono,
    //       credito:element.credito,
    //       usuario:element.usuario
    //     }
    //     this.dataAbonos.push(data);
    //   });
    //   this.dataSource.data = this.dataAbonos;
    // });
  }
  openDialog(id:string, url:string,title:string, table:string){
    // Abono.OpenDialog(id,url,title,table,this.dialog,DialogcomponentComponent);
  }
  Delete(id:string){
    // Abono.delete(id,this.service);
  }
  Paginator(){
    const pageSize = this.paginator ? this.paginator.pageSize : 2;
    const currentPageIndex = this.paginator ? this.paginator.pageIndex : 0;
    const startCursor = currentPageIndex * pageSize;
    console.log(pageSize, startCursor);
    this.data.GetPaginator(startCursor,pageSize ).subscribe( ({edges, totalCount
    })=> {
      this.dataSource.data = edges.map((edge:any) => edge.node)
      this.paginator.length = totalCount;
    })
  }
  pageChanged(event: PageEvent){
    this.paginator.pageSize = event.pageSize;
    this.Paginator();
  }
}
