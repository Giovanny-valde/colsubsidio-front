import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoMovimiento } from '../models/tipo-movimiento.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoMovimientoService {
    
    private apiUrl = environment.urlAPi;

  constructor(private http: HttpClient) { }

  getTiposMovimiento(): Observable<TipoMovimiento[]> {
    const url = `${this.apiUrl}/tipos-movimiento`;
    return this.http.get<TipoMovimiento[]>(url);
  }

}
