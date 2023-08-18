import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { GetRolService } from '../../services/get-rol.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  private rolObservable = new BehaviorSubject<any>({role:''});
  private filterObservable = new BehaviorSubject<any>({filter:[]});
  private filtersObservable = new BehaviorSubject<any>({filters:[]});
  get RolObservable(){
    return this.rolObservable.asObservable();
  }
  set RolObservableData(rol:any){
    this.rolObservable.next(rol)
  }
  get FilterObservable(){
    return this.filterObservable.asObservable();
  }
  set FilterObservableData(filter:any){
    this.filterObservable.next(filter)
  }
  get FiltersObservable(){
    return this.filtersObservable.asObservable();
  }
  set FiltersObservableData(filter:any){
    this.filtersObservable.next(filter)
  }
  constructor(private rol:GetRolService ) {
    if(localStorage.getItem('token') !== null){
      let decoded:any = jwt_decode(localStorage.getItem('token')!);
      this.rol.decryptRol({role:decoded.role, key: decoded.key},localStorage.getItem('token')!).subscribe(
          (data:any) => {
            this.rolObservable.next(data.role);
          },
          (error:any) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error encrypt',
            })
          }
        );
    }
  }
}
