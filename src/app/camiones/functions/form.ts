import { FormControl, Validators } from '@angular/forms';

export const camionesForm = (formBuilder:any) =>{
  return {
    num_serie: ['',[
      Validators.required,
      Validators.minLength(17),
      Validators.maxLength(17),
      Validators.pattern(/^[0-9]+$/g)
    ]],
    niv:['',[
      Validators.required,
      Validators.minLength(17),
      Validators.maxLength(17),
      Validators.pattern(/^[0-9]+$/g),
    ]],
    id_historial:[''],
    id_gastos:[''],
    id_rutas:[''],
    id_usuario:[''],
    placas:formBuilder.array([]),
    addplacas:formBuilder.array([]),
  }
}
function ValidatorPlaca(control:FormControl):any{
  const filtroPLaca = /[-IOQioq]/g;
  const test = filtroPLaca.test(control.value);
  if(test){
    return {validatorPlaca:true}
  }
  return null;
}
export const addPlaca = {
  placa:['',[
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(6),
    Validators.pattern(/^[A-Za-z0-9]+$/),
    ValidatorPlaca.bind(this)
  ]],
  activa:[false],
  estado:['',[Validators.required,
  Validators.minLength(4)]]
}

