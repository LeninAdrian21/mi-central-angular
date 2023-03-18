import { Injectable } from '@angular/core';
import { gql,Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

const QUERY = gql`
query {
  creditos(where:{
    mostrar:true
  }){
    id
    limite
    fecha_alta
    fecha_baja
    vigencia
    intereses
    status
    usuario{
      id
    }
    metodo_pago{
      id
    }
    abonos{
      id
    }
  }
}
`
@Injectable({
  providedIn: 'root'
})
export class DataCreditosService {
  private creditosSubject = new BehaviorSubject<any>([]);
  creditos$ = this.creditosSubject.asObservable();
  constructor( private apollo: Apollo) {
    this.GetData();
  }
  GetData(){
    this.apollo.watchQuery<any>({
      query:QUERY
    }).valueChanges.subscribe(
      ({data})=>{
        const {creditos} = data;
        this.creditosSubject.next(creditos);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al mostrar los creditos',
        })
      }
    )
  }
}
