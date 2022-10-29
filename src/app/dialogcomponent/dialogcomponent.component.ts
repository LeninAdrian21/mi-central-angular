import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef  } from '@angular/material/dialog';
import { table } from 'src/functions/table';
import { CrudService } from '../services/crud.service';
@Component({
  selector: 'app-dialogcomponent',
  templateUrl: './dialogcomponent.component.html',
  styleUrls: ['./dialogcomponent.component.scss']
})
export class DialogcomponentComponent implements OnInit {
  jwt:any;
  token:any;
  dataId:any;
  table:any | undefined = table;
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.getDataId(this.data.id,this.data.url)
  }
  constructor(
    public dialogRef: MatDialogRef<DialogcomponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: CrudService) {}
  getDataId(id:string, url:string){
    this.service.get(`${url}/${id}`, this.token).subscribe(
      (data:any) => {
        this.dataId = data;
      },
      (error) => {
        console.log(error);
        alert('Error');
      }
    )
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
