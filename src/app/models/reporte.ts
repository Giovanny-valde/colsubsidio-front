import { Cuenta } from "./cuenta.model";
import { TipoMovimiento } from "./tipo-movimiento.model";

export interface Reporte {
    cuenta: Cuenta;
    credito : number;
    debito  : number;
  }