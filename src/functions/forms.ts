import { Validators } from '@angular/forms';
export const Form = (type:string, date?:any)=> {
  const formfield:any = {
    abono: [
      { label: 'Cantidad de abono', type: 'text', placeholder: 'Cantidad de abono', name: 'cantidad_abono',  validators:[Validators.required], disabled: false},
      { label: 'Fecha de abono', type: 'text', name: 'fecha_abono', validators:[Validators.required], disabled: true, default:date},
      { label: 'Estado del abono', type: 'select', name: 'estado_abono',  validators:[Validators.required], disabled: false, options: [
        { value: 'devolucion', label: 'Devolucion' },
        { value: 'cancelacion', label: 'Cancelacion' },
        { value: 'activo', label: 'Activo' },
        { value: 'pagado', label: 'Pagado' },
        { value: 'parcial', label: 'Parcial' },
        { value: 'completo', label: 'Completo' },
        { value: 'adeudo', label: 'Adeudo' },
        { value: 'otro', label: 'Otro' }
      ]},
      { label: 'Intereses del Credito', type: 'select', name: 'id_credito', required: false, disabled: false},
      { label: 'Nombre del usuario', type: 'select', name: 'id_usuario', required: false, disabled: false}
    ],
    camion:[
      { label: 'Numero de serie', type:'text', name: 'num_serie', placeholder:'Numero de serie',required: true, disabled: false,minLength:17,maxLength:17,pattern:/^[0-9]+$/},
      { label: 'Numero de identificacion vehicular', type:'text', name: 'niv', placeholder:'Numero de identificacion vehicular',required: true, disabled: false,minLength:17,maxLength:17, pattern:/^[0-9]+$/},
      { label: 'Fecha del historial', type: 'select', name: 'id_historial', required: false, disabled: false},
      // { label: 'Monto del gasto', type: 'select', name: 'id_gastos', required: false, disabled: false},
      // { label: 'Lugar de origen', type: 'select', name: 'id_rutas', required: false, disabled: false},
      { label: 'Nombre del usuario', type: 'select', name: 'id_usuario', required: false, disabled: false},

    ],
    usuarioRegister: [
      { label: 'Nombre', type: 'text', placeholder: 'Nombre', name: 'nombre', required: true,minLength:3, disabled: false },
      { label: 'Apellido Paterno', type: 'text', placeholder: 'Apellido Paterno', name: 'ap_paterno', required: true, disabled: false },
      { label: 'Apellido Materno', type: 'text', placeholder: 'Apellido Materno', name: 'ap_materno', required: false, minLength:3, disabled: false },
      { label: 'Fecha de Nacimiento', type: 'date', name: 'fecha_nac', required: true, disabled: false },
      { label: 'Género', type: 'select', name: 'genero', required: true, disabled: false, options: [
        { value: 'masculino', label: 'Masculino' },
        { value: 'femenino', label: 'Femenino' }
      ]},
      { label: 'Fecha de Inscripción', type: 'date', name: 'fecha_ins', required: true, disabled: false },
      { label: 'Fecha de Alta', type: 'date', name: 'fecha_alta', required: true, disabled: false },
      { label: 'RFC', type: 'text', placeholder: 'RFC', name: 'rfc', required: true,minLength:14,maxLength:14, disabled: false },
      { label: 'CURP', type: 'text', placeholder: 'CURP', name: 'curp', required: true,minLength:18,maxLength:18, disabled: false },
      { label: 'Numero de seguro social', type: 'text', placeholder: 'Numero de seguro social', name: 'nss', required: false,minLength:8,maxLength:8,pattern:/^\d+$/,disabled: false },
      { label: 'Teléfono Celular', type: 'text', placeholder: 'Teléfono Celular', name: 'tel_cel', required: true,minLength:10,maxLength:10,pattern:/^\d+$/, disabled: false },
      { label: 'Email', type: 'email', placeholder: 'Email', name: 'email', required: false, disabled: false, pattern:/^[a-zA-Z0-9._%+-]+@(gmail|outlook|yahoo|aol|icloud|protonmail|zoho|mail|gmx|yandex|tutanota|fastmail|hushmail|disroot|riseup)\.[a-zA-Z]{2,}$/, minLength:10},
      { label: 'Password', type: 'password', placeholder: 'Pasword', name: 'password', required: true,minLength:8,maxLength:15,pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&])(?!.*(.)\1)[A-Za-z\d$@!%*?&]{8,15}(?!\s)/, disabled: false },
      { label: 'Tipo de Sangre', type: 'select', name: 'tipo_sangre', required: true, disabled: false, options: [
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' }
      ]},
      { label: 'Licencia', type: 'text', placeholder: 'Licencia', name: 'licencia', required: true, disabled: false },
      { label: 'Alergias', type: 'text', placeholder: 'Alergias', name: 'alergias', required: true, disabled: false },
      { label: 'Padecimientos', type: 'text', placeholder: 'Padecimientos', name: 'padecimientos', required: true, disabled: false },
      { label: 'Nacionalidad', type: 'text', placeholder: 'Nacionalidad', name: 'nacionalidad', required: true, disabled: false },
      { label: 'Calle', type: 'text', placeholder: 'Calle', name: 'calle', required: true, disabled: false },
      { label: 'Número', type: 'number', placeholder: 'Número', name: 'numero', required: true, disabled: false },
      { label: 'Colonia', type: 'text', placeholder: 'Colonia', name: 'colonia', required: true, disabled: false },
      { label: 'Código Postal', type: 'text', placeholder: 'Código Postal', name: 'cp', required: true, disabled: false },
      { label: 'Municipio', type: 'text', placeholder: 'Municipio', name: 'municipio', required: true, disabled: false },
      { label: 'Ciudad', type: 'text', placeholder: 'Ciudad', name: 'ciudad', required: true, disabled: false },
      { label: 'País', type: 'text', placeholder: 'País', name: 'pais', required: true, disabled: false },
      { label: 'Referencia directa', type: 'text', placeholder: 'Referencia directa', name: 'ref_dir', required: true, disabled: false },
      { label: 'Rol', type: 'select', name: 'rol', required: false, disabled: false,
      default: '64a32140e36daf2da8ca7570', options:[
        {value: '64a32140e36daf2da8ca7570', label: 'User'}
      ]
    },
      { label: 'Comentario', type: 'textarea', placeholder: 'Comentario', name: 'comentario', required: true, disabled: false },
      { label: 'Status', type: 'checkbox', name: 'status', disabled: false, default: false },
      {name: 'recapcha'},
    ],
    userLoggin:[

    ]
  }
  return formfield[type] || [];
}


