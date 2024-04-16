// cliente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { environment } from 'src/environments/environment';
import { Reporte } from '../models/reporte';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
    private apiUrl = environment.urlAPi;
  
    constructor(private http: HttpClient) { }
  
    // Operación para obtener todos los clientes
    getClientes(): Observable<Cliente[]> {
      const url = `${this.apiUrl}/clientes`;
      return this.http.get<Cliente[]>(url);
    }
  
    // Operación para obtener un cliente por ID
    getCliente(id: number): Observable<Cliente> {
      const url = `${this.apiUrl}/clientes/${id}`;
      return this.http.get<Cliente>(url);
    }
  
    // Operación para crear un nuevo cliente
    crearCliente(cliente: Cliente): Observable<Cliente> {
      const url = `${this.apiUrl}/clientes`;
      return this.http.post<Cliente>(url, cliente);
    }
  
    // Operación para actualizar un cliente existente
    actualizarCliente(cliente: Cliente): Observable<Cliente> {
      const url = `${this.apiUrl}/clientes`;
      return this.http.put<Cliente>(url, cliente);
    }
  
    // Operación para eliminar un cliente por ID
    eliminarCliente(id: number): Observable<any> {
      const url = `${this.apiUrl}/clientes/${id}`;
      return this.http.delete(url);
    }

    reporteMovimiento(data : {fechaFin : string , fechaInicial :string , id : string}): Observable<Reporte[]> {
      const url = `${this.apiUrl}/clientes/search/reporte`;
  
      const params = new HttpParams()
      .set('fechaStart',data.fechaInicial + "T09:00:00")
      .set('fechaEnd', data.fechaFin+ "T09:00:00")
      .set('id', data.id)
  
      return this.http.get<Reporte[]>(url, {params});
    }
  }