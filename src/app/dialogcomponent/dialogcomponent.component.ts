import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef  } from '@angular/material/dialog';
import { table } from './functions/functions';
import Swal from 'sweetalert2';
import { CrudService } from '../services/crud.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dialogcomponent',
  templateUrl: './dialogcomponent.component.html',
  styleUrls: ['./dialogcomponent.component.scss']
})
export class DialogcomponentComponent implements OnInit {
  jwt:any;
  token:any;
  refresh:any;
  dataId:any;
  table:any | undefined = table;
  error:any;
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.refresh = localStorage.getItem('refresh');
    this.getDataId(this.data.id,this.data.url)
  }
  constructor(
    public dialogRef: MatDialogRef<DialogcomponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: CrudService,
    private router:Router
  ) {}
  getDataId(id:string, url:string){
    this.service.get(`${url}/${id}`, this.token).subscribe(
      (data:any) => {
        this.dataId = data;
      },
      (error) => {
        // console.log(error);
        // this.error = error
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: this.error
        // });
        if(error.includes('401 Unauthorized')){
          this.service.refresh('usuarios/refresh_token',localStorage.getItem('refresh')!).subscribe(
            (data:any)=>{
              localStorage.setItem('token', data.token);
              localStorage.setItem('rol',data.user.tipo_rol);
              Swal.fire({
                icon: 'success',
                title: 'Listo',
                text: 'Se hara un nuevo token'
              });
              setTimeout(() => {
                location.reload();
              }, 1000);
            },(error)=>{
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Se termino la session',
                showConfirmButton: false,
                timer: 1000
              });
              this.onNoClick();
              setTimeout(() => {
                this.router.navigate(['/auth/login']);
                localStorage.clear();
              }, 2000);
            }
          )
        }
      }
    )
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
