import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef  } from '@angular/material/dialog';
import { ToastrService, ToastToken, TOAST_CONFIG } from 'ngx-toastr';
import { Delete, deleteMostrar } from 'src/functions/functions';
@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
   }

  ngOnInit(): void {

  }
  Cancel():void{
    this.dialogRef.close();
  }
  Accept():void{
    const {id,service,url} = this.data;
    if(this.data.mostrar){
       deleteMostrar(id,service,url)
      return
    }
    Delete(id,service,url);
    this.dialogRef.close();
  }
}
