export const Form = (type:string, date:any)=> {
  const currentDateTime = new Date();

// Obtener los componentes de la fecha y hora
const year = currentDateTime.getFullYear();
const month = currentDateTime.getMonth() + 1;
const day = currentDateTime.getDate();
const hours = currentDateTime.getHours();
const minutes = currentDateTime.getMinutes();
const seconds = currentDateTime.getSeconds();

// Crear una cadena de texto en el formato deseado
const formattedDateTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const formfield:any = {
    abono: [
      { label: 'Cantidad de abono', type: 'text', placeholder: 'Cantidad de abono', name: 'cantidad_abono', required: true, disabled: false},
      { label: 'Fecha de abono', type: 'text', name: 'fecha_abono', required: true, disabled: true, default: new Date() },
      { label: 'Estado del abono', type: 'select', name: 'estado_abono', required: true, disabled: false, options: [
        { value: 'devolucion', label: 'Devolucion' },
        { value: 'cancelacion', label: 'Cancelacion' },
        { value: 'activo', label: 'Activo' },
        { value: 'pagado', label: 'Pagado' },
        { value: 'parcial', label: 'Parcial' },
        { value: 'completo', label: 'Completo' },
        { value: 'adeudo', label: 'Adeudo' },
        { value: 'otro', label: 'Otro' }
      ]},
      { label: 'Creditos', type: 'select', name: 'id_credito', required: false, disabled: false},
      { label: 'Usuarios', type: 'select', name: 'id_usuario', required: false, disabled: false}
    ]
  }
  return formfield[type] || [];
}

