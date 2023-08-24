import { Component, OnInit } from "@angular/core";
import { DataAbonosService } from "../../service/data-abonos.service";
import { CrudService } from "src/app/services/crud.service";
import { MatDialog } from "@angular/material/dialog";
import { VariablesService } from "src/app/core/services/variables.service";
import { Funcions, Mensaje } from "src/functions/functions";
import { DialogcomponentComponent } from "src/app/dialogcomponent/dialogcomponent.component";
import { FilterComponent } from "src/app/filter/filter.component";
import { FormControl } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { table } from "src/functions/table";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { ExportComponent } from "src/app/export/export.component";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit{
  start = 0;
  limit = 20;
  filters:any = [];
  $abonos = this.data.abonos$;
  items:any[]=[];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = table.Abonos.columns;
  totalCount = 0;
  NextPage: any;
  cargar = false;
  keywordHandlers:any = {
    'filters':()  => {
      this.getPaginator(this.filters);
    },
    'default': () => {
      this.getPaginator();
    }
  };
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
  }

  getPaginator(filters?:any) {
    this.
    data.GetPaginator(this.start,this.limit, filters).subscribe(({edges, totalCount, pageInfo}) => {
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
    this.$abonos.subscribe(element =>{
      this.variables.FilterObservableData = element;
    })
  }
  loadMore(){
    if(this.filters.length > 0){
      const handler = this.keywordHandlers['filters'];
      if(this.NextPage){
        this.start += this.limit;
        handler();
      }
    } else {
      const handler = this.keywordHandlers['default'];
      if(this.NextPage){
        this.start += this.limit;
        handler();
      }
    }
  }
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
  openDialog(id:string, url:string,title:string, table:string){
    const data = {
      id,url,title,table
    }
    Funcions.Dialog(this.dialog,DialogcomponentComponent,'550px','500px',data);
  }
  Clear(){
    this.getPaginator();
  }
  Filter(){
    this.ListarData();
    const data = {
      collection: 'abonos',
    }
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '1250px',
      height: '600px',
      data, // Pasa la información al diálogo a través de la propiedad "data"
    });
    // const dialogRef = Funcions.Dialog(this.dialog, FilterComponent,'600px','1250px',data);
    dialogRef.afterClosed().subscribe((result) => {
      this.filters = result;
      for (let i = 0; i < this.filters.length; i++) {
        this.filters[i].value = this.filters[i].value.toString();
        this.filters[i].min = this.filters[i].min.toString();
        this.filters[i].max = this.filters[i].max.toString();
      }
      this.data.GetPaginator(this.start,this.limit,this.filters).subscribe(({edges, totalCount, pageInfo}) => {
        // console.log(edges)
        this.totalCount = totalCount;
        this.NextPage = pageInfo?.hasNextPage;
        if(edges){
          this.items = [];
          edges.forEach((item: any) => this.items.push(item.node));
          this.dataSource.data = this.items;
        }
      },
      (error: any) => {
        Mensaje('Se produjo un error al cargar los datos.');
      }
      );
    });
  }
  Export(){
    Swal.fire({
      title: 'Are you sure?',
      text: this.filters.length === 0
      ? "¿Deseas tener algún filtro en tu documento?"
      : "¿Deseas guardar los filtros que ya tienes para tu documento?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: this.filters.length === 0
      ? "No"
      : "No, deseo poner otros filtros",
    }).then((result) => {
      if(result.isConfirmed){
        if(this.filters.length === 0){
          let data = {
            collection: 'abonos',
            filters: this.filters
          }
          const dialogRef = this.dialog.open(FilterComponent, {
            width: '1250px',
            height: '600px',
            data, // Pasa la información al diálogo a través de la propiedad "data"
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.filters = result ? result : [];
            if(this.filters && this.filters.length > 0) {
              for (let i = 0; i < this.filters.length; i++) {
                this.filters[i].value = this.filters[i].value.toString();
                this.filters[i].min = this.filters[i].min.toString();
                this.filters[i].max = this.filters[i].max.toString();
              }
            }
            const dialogExport = this.dialog.open(ExportComponent, {
              width: '1250px',
              height: '600px',
              data:{
                collection: data.collection
              }, // Pasa la información al diálogo a través de la propiedad "data"
            });
            dialogExport.afterClosed().subscribe((result) => {
              // this.filters = result ? result : [];
              // if(this.filters && this.filters.length > 0) {
              //   for (let i = 0; i < this.filters.length; i++) {
              //     this.filters[i].value = this.filters[i].value.toString();
              //     this.filters[i].min = this.filters[i].min.toString();
              //     this.filters[i].max = this.filters[i].max.toString();
              //   }
              // }
            });
          });

        }else {

        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log("Cancelado");
      }
    })
  }
  Delete(id:string){
    Funcions.delete(id,this.service,'abonos','update_mostrar','Abono eliminado correctamente');
  }
}
