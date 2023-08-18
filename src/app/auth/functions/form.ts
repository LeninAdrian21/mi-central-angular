import { Validators } from "@angular/forms";

export const Login = {
  email: ['',[Validators.required, Validators.email]],
  password: ['',[Validators.required, Validators.minLength(6)]],
  recaptcha: ['']
}
export const Register = {
  nombre: ['',[Validators.required, Validators.minLength(3)]],
  ap_paterno: ['',[Validators.required, Validators.minLength(3)]],
  ap_materno: ['',[Validators.required, Validators.minLength(3)]],
  fecha_nac: ['',[Validators.required]],
  genero: ['',[Validators.required]],
  fecha_ins: ['',[Validators.required]],
  fecha_alta: ['',[Validators.required]],
  rfc: ['',[Validators.required,  Validators.minLength(14), Validators.maxLength(14)]],
  curp: ['',[Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
  nss: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8),Validators.pattern(/^\d+$/)]],
  tel_cel: ['',[Validators.required,Validators.minLength(10), Validators.maxLength(10),Validators.pattern(/^\d+$/)]],
  email: ['',[Validators.required, Validators.email]],
  password: ['',[
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(15),
    // Al menos una letra minuscula, almenos una letra mayuscula , al menos un digito al menos un caracter espeacial($@$!%*?&) y ningun digito duplicado y sin espacios
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&])(?!.*(.)\1)[A-Za-z\d$@!%*?&]{8,15}(?!\s)/),
  ]],
  tipo_sangre: ['',[Validators.required]],
  licencia: ['',[Validators.required]],
  alergias: ['',[Validators.required]],
  padecimientos: ['',[Validators.required]],
  nacionalidad: ['',[Validators.required]],
  calle: ['',[Validators.required]],
  numero: ['',[Validators.required]],
  colonia: ['',[Validators.required]],
  cp: ['',[Validators.required]],
  municipio: ['',[Validators.required]],
  ciudad: ['',[Validators.required]],
  pais: ['',[Validators.required]],
  ref_dir: ['',[Validators.required]],
  rol: ['',[Validators.required]],
  status: [false,[Validators.required]],
  comment: ['',[Validators.required]],
  recaptcha: ['', Validators.required]
}
