import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { Bien } from '../modelos/bien.model';
import { BienesService } from '../servicios/bienes.service';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-incendio',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, CommonModule, RouterModule, ReactiveFormsModule,MatIconModule],
  templateUrl: './incendio.component.html',
  styleUrls: ['./incendio.component.scss']
})
export class IncendioComponent implements OnInit {
  bienes: Bien[] = []; // Lista de todos los bienes obtenidos del servicio
  bienesFiltrados: Bien[] = []; // Lista de bienes filtrados que se muestran en la tabla
  formBien!: FormGroup; // Formulario reactivo para gestionar los campos de un bien
  mostrarFormulario: boolean = false; // Variable para mostrar/ocultar el formulario de agregar bien
  codigoExistente: boolean = false; // Indicador para saber si el código existe

  // Definición de los campos del formulario con sus propiedades
  formFields = [
    { name: 'codigo', label: 'Código', type: 'text', placeholder: 'Ingrese Código' },
    { name: 'articuloBienes', label: 'Artículo Bienes', type: 'text', placeholder: 'Ingrese Artículo' },
    { name: 'procesoEstaciones', label: 'Proceso', type: 'text', placeholder: 'Ingrese Proceso' },
    { name: 'cantidad', label: 'Cantidad', type: 'number', placeholder: 'Ingrese Cantidad' },
    { name: 'descripcionArticulo', label: 'Descripción Artículo', type: 'text', placeholder: 'Ingrese Descripción' },
    { name: 'descripcionMovimiento', label: 'Descripción Movimiento', type: 'text', placeholder: 'Ingrese Movimiento' },
    { name: 'estado', label: 'Estado', type: 'text', placeholder: 'Ingrese Estado' },
    { name: 'riesgo', label: 'Riesgo', type: 'text', placeholder: 'Ingrese Riesgo' },
    { name: 'fechaIngreso', label: 'Fecha Ingreso', type: 'date', placeholder: 'Seleccione Fecha de Ingreso' },
    { name: 'fechaModificacion', label: 'Fecha Modificación', type: 'date', placeholder: 'Seleccione Fecha de Modificación' },
    { name: 'vrUnitario2023', label: 'Vr Unitario 2023', type: 'number', placeholder: 'Ingrese Valor Unitario 2023' },
    { name: 'vrAsegurado', label: 'Vr Asegurado', type: 'number', placeholder: 'Ingrese Valor Asegurado' },
    { name: 'porcentajeIva', label: 'Porcentaje IVA', type: 'number', placeholder: 'Ingrese Porcentaje IVA' },
    { name: 'ivaVariable', label: 'IVA Variable', type: 'number', placeholder: 'Ingrese IVA Variable' },
    { name: 'vrAsegurable', label: 'Vr Asegurable', type: 'number', placeholder: 'Ingrese Valor Asegurable' },
    { name: 'tasaGeneral', label: 'Tasa General', type: 'number', placeholder: 'Ingrese Tasa General' },
    { name: 'prima', label: 'Prima', type: 'number', placeholder: 'Ingrese Prima' },
    { name: 'tasaIva', label: 'Tasa IVA', type: 'number', placeholder: 'Ingrese Tasa IVA' },
    { name: 'primaIvaAnual', label: 'Prima IVA Anual', type: 'number', placeholder: 'Ingrese Prima IVA Anual' },
    { name: 'primaAnualTotal', label: 'Prima Anual Total', type: 'number', placeholder: 'Ingrese Prima Anual Total' },
    { name: 'beneficiarioAdicional', label: 'Beneficiario Adicional', type: 'text', placeholder: 'Ingrese Beneficiario Adicional' },
    { name: 'numeroEndoso', label: 'Número Endoso', type: 'text', placeholder: 'Ingrese Número Endoso' },
    { name: 'valorEndoso', label: 'Valor Endoso', type: 'number', placeholder: 'Ingrese Valor Endoso' },
    { name: 'vigenciaEndoso', label: 'Vigencia Endoso', type: 'date', placeholder: 'Seleccione Vigencia Endoso' },
    { name: 'banco', label: 'Banco', type: 'text', placeholder: 'Ingrese Banco' },
    { name: 'nitBanco', label: 'NIT Banco', type: 'text', placeholder: 'Ingrese NIT Banco' },
  ];

  constructor(
    private bienesService: BienesService, // Servicio para gestionar bienes
    private router: Router, // Servicio de enrutamiento para navegación
    private fb: FormBuilder // Constructor de formularios reactivos
  ) {}

  ngOnInit(): void {
    // Inicialización del formulario con todos los campos deshabilitados
    this.formBien = this.fb.group({
      codigo: ['', Validators.required],
      articuloBienes: [{ value: '', disabled: true }],
      procesoEstaciones: [{ value: '', disabled: true }],
      cantidad: [{ value: 0, disabled: true }],
      descripcionArticulo: [{ value: '', disabled: true }],
      descripcionMovimiento: [{ value: '', disabled: true }],
      estado: [{ value: '', disabled: true }],
      riesgo: [{ value: '', disabled: true }],
      fechaIngreso: [{ value: '', disabled: true }],
      fechaModificacion: [{ value: '', disabled: true }],
      vrUnitario2023: [{ value: 0, disabled: true }],
      vrAsegurado: [{ value: 0, disabled: true }],
      porcentajeIva: [{ value: 0, disabled: true }],
      ivaVariable: [{ value: 0, disabled: true }],
      vrAsegurable: [{ value: 0, disabled: true }],
      tasaGeneral: [{ value: 0, disabled: true }],
      prima: [{ value: 0, disabled: true }],
      tasaIva: [{ value: 0, disabled: true }],
      primaIvaAnual: [{ value: 0, disabled: true }],
      primaAnualTotal: [{ value: 0, disabled: true }],
      beneficiarioAdicional: [{ value: '', disabled: true }],
      numeroEndoso: [{ value: '', disabled: true }],
      valorEndoso: [{ value: 0, disabled: true }],
      vigenciaEndoso: [{ value: '', disabled: true }],
      banco: [{ value: '', disabled: true }],
      nitBanco: [{ value: '', disabled: true }]
    });

    this.cargarBienes();

    // Suscripción a cambios en el campo 'codigo' para verificar existencia en tiempo real
    this.formBien.get('codigo')?.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(codigo => {
      if (codigo) {
        this.verificarCodigo(codigo);
      } else {
        this.codigoExistente = false;
        this.habilitarCampos(false); // Deshabilitar campos si no hay código
      }
    });
  }

  // Método para cargar todos los bienes desde el servicio
  cargarBienes(): void {
    this.bienesService.getBienes().subscribe((data: Bien[]) => {
      this.bienes = data;
      this.bienesFiltrados = data; // Inicializa los bienes filtrados con todos los bienes
    });
  }

  verificarCodigo(codigo: string): void {
    const codigoExistente = this.bienes.find(bien => bien.codigo === codigo);
    if (codigoExistente) {
      this.codigoExistente = true;
      this.habilitarCampos(false); // Mantener los campos deshabilitados
      alert('El código ingresado ya existe. Por favor, ingrese un código diferente.');
    } else {
      this.codigoExistente = false;
      this.habilitarCampos(true); // Habilitar campos si el código no existe
    }
  }
  // Método para habilitar o deshabilitar los campos del formulario
  habilitarCampos(habilitar: boolean): void {
    const campos = Object.keys(this.formBien.controls);
    campos.forEach(campo => {
      if (campo !== 'codigo') {
        if (habilitar) {
          this.formBien.get(campo)?.enable();
        } else {
          this.formBien.get(campo)?.disable();
        }
      }
    });
  }

  // Método para mostrar/ocultar el formulario de agregar un bien
  mostrarFormularioAgregar(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  // Método para agregar un bien
  agregarBien(): void {
    if (this.formBien.valid) {
      this.bienesService.saveBien(this.formBien.value).subscribe(() => {
        alert('Bien agregado correctamente.');
        this.formBien.reset(); // Restablecer el formulario después de agregar
        this.mostrarFormulario = false;
        this.cargarBienes(); // Volver a cargar bienes para actualizar la lista
      });
    } else {
      alert('Por favor, complete el formulario correctamente.');
    }
  }

  // Método para redirigir al módulo anterior
  volverAModulo(): void {
    this.router.navigate(['/modulo']);
  }

  // Método para filtrar bienes por varios campos
  filtrarArticulos(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.bienesFiltrados = this.bienes.filter(bien =>
      bien.codigo.toLowerCase().includes(filtro) ||
      bien.articuloBienes.toLowerCase().includes(filtro) ||
      bien.descripcionArticulo.toLowerCase().includes(filtro) ||
      bien.procesoEstaciones.toLowerCase().includes(filtro) ||
      bien.descripcionMovimiento.toLowerCase().includes(filtro) ||
      bien.estado.toLowerCase().includes(filtro) ||
      bien.riesgo.toLowerCase().includes(filtro) ||
      bien.fechaIngreso.toLowerCase().includes(filtro) ||
      bien.fechaModificacion.toLowerCase().includes(filtro)
    );
  }
}
