import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class chuckNorrisSercice {
    
    private apiUrl = "https://api.chucknorris.io/jokes/random";

  constructor(private http: HttpClient) { }

  chucknorris(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get<any>(url);
  }

}
