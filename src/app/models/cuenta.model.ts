import { Cliente } from "./cliente.model";

export interface Cuenta {
    id: number;
    numero: number;
    saldo: number;
    cliente: Cliente;
  }