import { AccessGuard } from './protect/access.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ProtectGuard } from './protect/protect.guard';
import { AdministratorGuard } from './protect/administrator.guard';
import { environment } from 'src/environments/environment';
import { HasRoleGuard } from './protect/has-role.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path:'abonos',
    loadChildren: () => import('./abonos/abonos.module').then(m => m.AbonosModule),
    canLoad:[HasRoleGuard],
    canActivate:[HasRoleGuard],
    data:{
      AllRoles:[environment.Administrador]
    }
  },
  {
    path:'camiones',
    loadChildren: () => import('./camiones/camiones.module').then(m => m.CamionesModule),
  },
  {
    path:'carritos',
    loadChildren: () => import('./carritos/carritos.module').then(m => m.CarritosModule)
  },
  {
    path:'compras',
    loadChildren: () => import('./compras/compras.module').then(m => m.ComprasModule)
  },
  {
    path:'creditos',
    loadChildren: () => import('./creditos/creditos.module').then(m => m.CreditosModule)
  },
  {
    path:'dimensiones',
    loadChildren: () => import('./dimensiones/dimensiones.module').then(m => m.DimensionesModule)
  },
  {
    path:'gastos',
    loadChildren: () => import('./gastos/gastos.module').then(m => m.GastosModule)
  },
  {
    path:'historiales',
    loadChildren: () => import('./historiales/historiales.module').then(m => m.HistorialesModule)
  },
  {
    path:'locales',
    loadChildren: () => import('./locales/locales.module').then(m => m.LocalesModule)
  },
  {
    path:'lotes',
    loadChildren: () => import('./lotes/lotes.module').then(m => m.LotesModule)
  },
  {
    path:'metodo-pago',
    loadChildren: () => import('./metodo-pago/metodo-pago.module').then(m => m.MetodoPagoModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule)
  },
  {
    path: 'promociones',
    loadChildren: () => import('./promociones/promociones.module').then(m => m.PromocionesModule)
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./proveedores/proveedores.module').then(m => m.ProveedoresModule)
  },
  {
    path: 'rutas',
    loadChildren: () => import('./rutas/rutas.module').then(m => m.RutasModule)
  },
  {
    path: 'tipo-rol',
    loadChildren: () => import('./tipo-rol/tipo-rol.module').then(m => m.TipoRolModule)
  },
  {
    path:'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path:'vendedores',
    loadChildren: () => import('./vendedores/vendedores.module').then(m => m.VendedoresModule)
  },
  {
    path:'ventas',
    loadChildren: () => import('./ventas/ventas.module').then(m => m.VentasModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
