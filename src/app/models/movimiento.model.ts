import { TipoMovimiento } from './tipo-movimiento.model';
import { Cuenta } from './cuenta.model';

export interface Movimiento {
  id: number;
  fecha: Date;
  valor: number;
  tipoMovimiento: TipoMovimiento;
  cuenta: Cuenta;
}