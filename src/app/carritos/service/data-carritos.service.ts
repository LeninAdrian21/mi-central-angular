import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
const QUERY = gql`
query{
  carritos{
    id
    cantidad
    usuario{
      id
    }
    productos{
      id
    }
    venta{
      id
    }
  }
}
`;
@Injectable({
  providedIn: 'root'
})
export class DataCarritosService {
  private carritosSubject = new BehaviorSubject<any>([]);
  carritos$ =  this.carritosSubject.asObservable();
  constructor(private apollo: Apollo) {
    this.GetData();
  }
  GetData() {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.subscribe(({ data }) => {
      const {carritos} = data;
      console.log(carritos);

      this.carritosSubject.next(carritos);
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al mostrar el carrito',
      })
    }
    );
  }
}
