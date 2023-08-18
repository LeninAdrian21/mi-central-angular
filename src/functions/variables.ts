let string = [
  {
    operator: '==',
    value: 'Igual'
  },
  {
    operator: '!=',
    value: 'Diferente'
  },
  {
    operator:'contain',
    value:'Contenga'
  }
];
let numberAndDate=[
  {
    operator: '==',
    value: 'Igual'
  },
  {
    operator: '!=',
    value: 'Diferente'
  },
  {
    operator: '>',
    value: 'Mayor'
  },
  {
    operator: '>=',
    value: 'Mayor e igual'
  },
  {
    operator: '<',
    value: 'Menor '
  },
  {
    operator: '<=',
    value: 'Menor e igual'
  },
  {
    operator: 'range',
    value: 'Rango'
  },
]
export const filter:any = {
  abonos:{
    info:{cantidad_abono: [],fecha_abono: [], estado_abono: [],credito: [],usuario: []},
    keyword:'cantidad_abono',
    keywords:['cantidad_abono','fecha_abono','estado_abono','credito','usuario'],
    inputText:{cantidad_abono: 'Cantidad de abono',fecha_abono: 'Fecha de abono',estado_abono: 'Estado de aboo',credito: 'Intereses del credito',usuario: 'Nombre del usuario'},
    operatorOptions:{
      cantidad_abono:numberAndDate,
      fecha_abono:numberAndDate,
      estado_abono:string,
      credito:numberAndDate,
      usuario: string
    }
  },
}
export const fileExport:any = {
  abonos:{
    fields:['cantidad_abono','fecha_abono','estado_abono','credito','usuario'],
    fieldText: {cantidad_abono: 'Cantidad de abono',fecha_abono: 'Fecha de abono',estado_abono: 'Estado de aboo',credito: 'Intereses (Credito)',usuario: 'Nombre (Usuario)'},
    field:['cantidad_abono']
  }
}
