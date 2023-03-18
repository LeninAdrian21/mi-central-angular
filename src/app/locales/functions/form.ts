import { Validators } from "@angular/forms";

export const localesForm = {
  nombre:['',[Validators.required]],
  alias:['',[Validators.required]],
  razon_social:['',[Validators.required]],
  rfc: ['',[Validators.required,  Validators.minLength(14), Validators.maxLength(14)]],
  fecha_alta:['',[Validators.required]],
  calle:['',[Validators.required]],
  colonia:['',[Validators.required]],
  numero_ext:['',[Validators.required]],
  municipio:['',[Validators.required]],
  numero_int:['',[Validators.required]],
  ciudad:['',[Validators.required]],
  cp:['',[Validators.required]],
  latitud:['',[Validators.required]],
  longitud:['',[Validators.required]],
  telefono:['',[Validators.required]],
  telefono_cel:['',[Validators.required]],
  giro:['',[Validators.required]],
  status:[false],
  id_ventas:[''],
  id_usuario:['']
}
