// src/app/modelos/bien.model.ts

export interface Bien {
editando: any;
proceso: any;
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
