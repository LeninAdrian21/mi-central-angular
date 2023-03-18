import { Validators } from "@angular/forms";
export const dimensionesForm ={
  nombre: ['',[Validators.required]],
  ancho: ['',[Validators.required]],
  alto: ['',[Validators.required]],
  largo: ['',[Validators.required]],
  id_productos:['']
}
