import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuenta } from '../models/cuenta.model';
import { environment } from 'src/environments/environment';
import { Reporte } from '../models/reporte';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
    private apiUrl = environment.urlAPi;

  constructor(private http: HttpClient) { }

  // Operación para obtener todas las cuentas
  getCuentas(): Observable<Cuenta[]> {
    const url = `${this.apiUrl}/cuentas`;
    return this.http.get<Cuenta[]>(url);
  }

  // Operación para obtener una cuenta por ID
  getCuenta(id: number): Observable<Cuenta> {
    const url = `${this.apiUrl}/cuentas/${id}`;
    return this.http.get<Cuenta>(url);
  }

  // Operación para crear una nueva cuenta
  crearCuenta(cuenta: Cuenta): Observable<Cuenta> {
    const url = `${this.apiUrl}/cuentas`;
    return this.http.post<Cuenta>(url, cuenta);
  }

  // Operación para actualizar una cuenta existente
  actualizarCuenta(cuenta: Cuenta): Observable<Cuenta> {
    const url = `${this.apiUrl}/cuentas`;
    return this.http.put<Cuenta>(url, cuenta);
  }

  // Operación para eliminar una cuenta por ID
  eliminarCuenta(id: number): Observable<any> {
    const url = `${this.apiUrl}/cuentas/${id}`;
    return this.http.delete(url);
  }



}
