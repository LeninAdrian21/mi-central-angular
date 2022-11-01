import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  private dataValidator:BehaviorSubject<any>= new BehaviorSubject({rol:localStorage.getItem('rol'), carga:false});
  get DataValidatorObservable(){
    return this.dataValidator.asObservable();
  }
  set DataValidatorData(data:any){
    this.dataValidator.next(data);
  }
  constructor() { }
}
