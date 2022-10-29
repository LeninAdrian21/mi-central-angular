import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from './crud.service';
@Injectable({
  providedIn: 'root',
})
export class GetCrudService {
  private abonosSubject = new BehaviorSubject<any>([]);
  abonos$ = this.abonosSubject.asObservable();
  private camionesSubject = new BehaviorSubject<any>([]);
  camiones$ = this.camionesSubject.asObservable();
  private carritosSubject = new BehaviorSubject<any>([]);
  carritos$ = this.carritosSubject.asObservable();
  private comprasSubject = new BehaviorSubject<any>([]);
  compras$ = this.comprasSubject.asObservable();
  private creditosSubject = new BehaviorSubject<any>([]);
  creditos$ = this.creditosSubject.asObservable();
  private dimensionesSubject = new BehaviorSubject<any>([]);
  dimensiones$ = this.dimensionesSubject.asObservable();
  private gastosSubject = new BehaviorSubject<any>([]);
  gastos$ = this.gastosSubject.asObservable();
  private historialesSubject = new BehaviorSubject<any>([]);
  historiales$ = this.historialesSubject.asObservable();
  private localesSubject = new BehaviorSubject<any>([]);
  locales$ = this.localesSubject.asObservable();
  private metodoPagoSubject = new BehaviorSubject<any>([]);
  metodoPago$ = this.metodoPagoSubject.asObservable();
  private productosSubject = new BehaviorSubject<any>([]);
  productos$ = this.productosSubject.asObservable();
  private promocionesSubject = new BehaviorSubject<any>([]);
  promociones$ = this.promocionesSubject.asObservable();
  private proveedoresSubject = new BehaviorSubject<any>([]);
  proveedores$ = this.proveedoresSubject.asObservable();
  private usuariosSubject = new BehaviorSubject<any>([]);
  usuarios$ = this.usuariosSubject.asObservable();
  private rutasSubject = new BehaviorSubject<any>([]);
  rutas$ = this.rutasSubject.asObservable();
  private lotesSubject = new BehaviorSubject<any>([]);
  lotes$ = this.lotesSubject.asObservable();
  private ventasSubject = new BehaviorSubject<any>([]);
  ventas$ = this.ventasSubject.asObservable();
  private vendedorSubject = new BehaviorSubject<any>([]);
  vendedor$ = this.vendedorSubject.asObservable();
  token: any = localStorage.getItem('token');
  add: any = localStorage.getItem('add');
  constructor(private service: CrudService) {
    this.getData();
  }
  getData() {
    switch (this.add) {
      case 'abono':
        this.creditos();
        this.usuarios();
      break;
      case 'camion':
        this.historiales();
        this.gastos();
        this.rutas();
        this.usuarios();
      break;
    }
  }
  abonos(){
    this.service.get('abonos',  this.token).subscribe(
      (data: any) => {
        this.abonosSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  camiones(){
    this.service.get('camiones',  this.token).subscribe(
      (data: any) => {
        this.camionesSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
      );
  }
  carritos(){
    this.service.get('carritos',  this.token).subscribe(
      (data: any) => {
        this.carritosSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  creditos(){
    this.service.get('creditos',  this.token).subscribe(
      (data: any) => {
        this.creditosSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  compras(){
    this.service.get('compras',  this.token).subscribe(
      (data: any) => {
        this.comprasSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  dimensiones(){
    this.service.get('dimensiones',  this.token).subscribe(
      (data: any) => {
        this.dimensionesSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  gastos(){
    this.service.get('gastos',  this.token).subscribe(
      (data: any) => {
        this.gastosSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  historiales(){
    this.service.get('historials',  this.token).subscribe(
      (data: any) => {
        this.historialesSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  locales(){
    this.service.get('locals', this.token).subscribe(
      (data: any) => {
        this.localesSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
      lotes(){
        this.service.get('lotes',  this.token).subscribe(
          (data: any) => {
            this.lotesSubject.next(data);
          },
          (error) => {
            console.log(error);
            alert('Error');
          }
        );
      }
  metodoPago(){
    this.service.get('metodos-de-pagos',  this.token).subscribe(
      (data: any) => {
        this.metodoPagoSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
      productos(){
        this.service.get('productos',  this.token).subscribe(
          (data: any) => {
            this.productosSubject.next(data);
          },
          (error) => {
            console.log(error);
            alert('Error');
          }
        );
      }
      promociones(){
        this.service.get('promociones',  this.token).subscribe(
          (data: any) => {
            this.promocionesSubject.next(data);
          },
          (error) => {
            console.log(error);
            alert('Error');
          }
        );
      }
      proveedores(){
        this.service.get('proveedors',  this.token).subscribe(
          (data: any) => {
            this.proveedoresSubject.next(data);
          },
          (error) => {
            console.log(error);
            alert('Error');
          }
        );
      }
  rutas(){
    this.service.get('rutas',  this.token).subscribe(
      (data: any) => {
        this.rutasSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  usuarios(){
    this.service.get('usuarios',  this.token).subscribe(
      (data: any) => {
        this.usuariosSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  ventas(){
    this.service.get('ventas', this.token).subscribe(
      (data: any) => {
        this.ventasSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
  vendedor(){
    this.service.get('vendedor-s', this.token).subscribe(
      (data: any) => {
        this.vendedorSubject.next(data);
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    );
  }
}
