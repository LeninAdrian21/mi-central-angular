import { environment } from 'src/environments/environment';
export const navData =[
  {
    routerLink: '/abonos/listado',
    label: 'Abonos',
    icon: 'label',
    permiso:[environment.Administrador,environment.Delivery_man]
  },
  {
    routerLink: '/camiones/listado',
    label: 'Camiones',
    icon: 'label',
    permiso:[environment.Administrador]
  },
  {
    routerLink: '/carritos/listado',
    label: 'Carritos',
    icon: 'label',
    permiso:[environment.Administrador]
  },
  {
    routerLink: '/compras/listado',
    label: 'Compras',
    icon: 'label',
     permiso:[environment.Administrador]
  },
  {
    routerLink: '/creditos/listado',
    label: 'Creditos',
    icon: 'label',
     permiso:[environment.Administrador]
  },
  {
    routerLink: '/dimensiones/listado',
    label: 'Dimensiones',
    icon: 'label',
     permiso:[environment.Administrador]
  },
  {
    routerLink: '/gastos/listado',
    label: 'Gastos',
    icon: 'label',
     permiso:[environment.Administrador]
  },
  {
    routerLink: '/historiales/listado',
    label: 'Historiales',
    icon: 'label',
     permiso:[environment.Administrador]
  },
  {
    routerLink: '/locales/listado',
    label: 'Locales',
    icon: 'label',
     permiso:[environment.Administrador]
  },
  {
    routerLink: '/lotes/listado',
    label: 'Lotes',
    icon: 'label',
     permiso:[environment.Administrador, environment.Delivery_man]
  },
  {
    routerLink: '/metodo-pago/listado',
    label: 'Metodo de Pago',
    icon: 'label',
     permiso:[environment.Administrador]
  },
  {
    routerLink: '/productos/listado',
    label: 'Productos',
    icon: 'label',
    permiso:[environment.Administrador]
  },
  {
    routerLink: '/promociones/listado',
    label: 'Promociones',
    icon: 'label',
     permiso:[environment.Administrador]
  },
  {
    routerLink: '/proveedores/listado',
    label: 'Proveedores',
    icon: 'label',
     permiso:[environment.Administrador]
  },
  {
    routerLink: '/rutas/listado',
    label: 'Rutas',
    icon: 'label',
     permiso:[environment.Administrador]
  },
  {
    routerLink: '/tipo-rol/listado',
    label: 'Tipo de Rol',
    icon: 'label',
     permiso:[environment.Administrador]
  },
  {
    routerLink: '/usuarios/listado',
    label: 'Usuarios',
    icon: 'label',
     permiso:[environment.Administrador]
  },
  {
    routerLink: '/vendedores/listado',
    label: 'Vendedores',
    icon: 'label',
     permiso:[environment.Administrador]
  },
  {
    routerLink: '/ventas/listado',
    label: 'Ventas',
    icon: 'label',
     permiso:[environment.Administrador]
  }
]
// 633cc31197ead65f9859ab6f:: Administrador
// 633cc33497ead65f9859ab70:: Delivery man
// 633cc35097ead65f9859ab71:: Manager
