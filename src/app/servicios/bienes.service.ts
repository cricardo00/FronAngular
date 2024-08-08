import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BienesService {

  private apiUrl = 'http://localhost:8080/bien/all'; // Reemplaza esto con la URL correcta de tu API

  constructor(private http: HttpClient) { }

  getBienes(): Observable<Bien[]> {
    return this.http.get<Bien[]>(this.apiUrl);
  }
}

export interface Bien {
  idBien: number;
  codigo: string;
  articuloBienes: string;
  procesoEstaciones: string;
  cantidad: number;
  descripcionArticulo: string;
  descripcionMovimiento: string;
  estado: string;
  riesgo: string;
  fechaIngreso: string;
  fechaModificacion: string;
  vrUnitario2023: number;
  vrAsegurado: number;
  porcentajeIva: number;
  ivaVariable: number;
  vrAsegurable: number;
  tasaGeneral: number;
  prima: number;
  tasaIva: number;
  primaIvaAnual: number;
  primaAnualTotal: number;
  beneficiarioAdicional: string;
  numeroEndoso: string;
  valorEndoso: number;
  vigenciaEndoso: string;
  banco: string;
  nitBanco: string;
}
