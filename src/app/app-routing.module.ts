import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { ReporteComponent } from './reporte/reporte.component';

const routes: Routes = [
  {
    path:"",
    component:ClientesComponent
  },
  {
    path:"clientes",
    component:ClientesComponent
  },
  {
    path:"cuentas",
    component:CuentasComponent
  },
  {
    path:"reporte",
    component:ReporteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
