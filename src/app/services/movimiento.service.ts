import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movimiento } from '../models/movimiento.model';
import { environment } from 'src/environments/environment';
import { Reporte } from '../models/reporte';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
    private apiUrl = environment.urlAPi;

  constructor(private http: HttpClient) { }

  // Operación para crear un nuevo movimiento
  crearMovimiento(movimiento: Movimiento): Observable<Movimiento> {
    const url = `${this.apiUrl}/movimientos`;
    return this.http.post<Movimiento>(url, movimiento);
  }

  

}