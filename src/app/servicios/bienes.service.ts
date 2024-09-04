import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Bien } from '../modelos/bien.model';

@Injectable({
  providedIn: 'root'
})
export class BienesService {
  // URL base del backend para acceder a los servicios relacionados con bienes
  private baseUrl = 'http://localhost:8080/bien';
  apiUrl: any;

  constructor(private http: HttpClient) {}

  // Método para obtener un bien por su código
  getBienPorCodigo(codigo: string): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/codigo/${codigo}`).pipe(
      catchError((error) => {
        // Manejo de errores en la solicitud GET
        console.error('Error obteniendo el bien por código:', error);
        return throwError(() => new Error('Error obteniendo el bien por código'));
      })
    );
  }

  // Método para obtener todos los bienes
  getBienes(): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/all`).pipe(
      catchError((error) => {
        // Manejo de errores en la solicitud GET
        console.error('Error obteniendo todos los bienes:', error);
        return throwError(() => new Error('Error obteniendo todos los bienes'));
      })
    );
  }

  // Método para buscar bienes por artículo e idriesgo
  buscarBienes(articulo: string, idriesgo: string): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/listaxfecha/${articulo}/${idriesgo}`).pipe(
      catchError((error) => {
        // Manejo de errores en la solicitud GET
        console.error('Error buscando bienes por artículo e idriesgo:', error);
        return throwError(() => new Error('Error buscando bienes por artículo e idriesgo'));
      })
    );
  }

  // Método para guardar un bien
  saveBien(bien: Bien): Observable<Bien> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Bien>(`${this.baseUrl}/save`, bien, { headers }).pipe(
      catchError((error) => {
        // Manejo de errores en la solicitud POST
        console.error('Error guardando el bien:', error);
        return throwError(() => new Error('Error guardando el bien'));
      })
    );
  }

  // Método para actualizar un bien
  updateBien(bienToUpdate: any): Observable<any> {
    console.log('Updating bien:', bienToUpdate); // Añade esta línea para depurar
    return this.http.put<any>(`${this.apiUrl}/bienes/${bienToUpdate.id}`, bienToUpdate)
      .pipe(
        catchError(error => {
          console.error('Error updating bien:', error); // Registra el objeto de error
          return throwError(error);
      })
    );
  }

  // Método para eliminar un bien
  deleteBien(codigo: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${codigo}`).pipe(
      catchError((error) => {
        // Manejo de errores en la solicitud DELETE
        console.error('Error eliminando el bien:', error);
        return throwError(() => new Error('Error eliminando el bien'));
      })
    );
  }

  // Método para agregar un bien
  agregarBien(nuevoBien: Bien): Observable<Bien> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Bien>(`${this.baseUrl}/add`, nuevoBien, { headers }).pipe(
      catchError((error) => {
        // Manejo de errores en la solicitud POST
        console.error('Error agregando el bien:', error);
        return throwError(() => new Error('Error agregando el bien'));
      })
    );
  }
}
