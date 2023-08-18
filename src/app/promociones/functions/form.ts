import { Validators } from "@angular/forms";
export const promocionesForm ={
  fecha_creacion:['',[Validators.required]],
  fecha_vigencia:['',[Validators.required]],
  valor_descuento:['',[Validators.required]],
  codigo_ref:['',[Validators.required]],
  condicion:['',[Validators.required]],
  id_productos:['']
}
