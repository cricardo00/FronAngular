// src/app/editar-bien/editar-bien.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BienesService } from '../servicios/bienes.service';
import { Bien } from '../modelos/bien.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-editar-bien',
  standalone: true,
  imports: [CommonModule, FormsModule], // Añade FormsModule a imports
  templateUrl: './editar-bien.component.html',
  styleUrls: ['./editar-bien.component.scss']
})
export class EditarBienComponent implements OnInit {
  bienes: Bien[] = []; // Lista de bienes relacionados con el código
  codigo: string | null = ''; // Código del bien recibido desde la ruta

  constructor(
    private route: ActivatedRoute, // Servicio para acceder a parámetros de ruta
    private bienesService: BienesService // Servicio para obtener datos de bienes
  ) {}

  ngOnInit(): void {
    // Obtiene el código del bien desde los parámetros de la ruta
    this.codigo = this.route.snapshot.paramMap.get('codigo');
    console.log('Código recibido:', this.codigo);

    if (this.codigo) {
      // Llama al servicio para obtener los datos del bien por el código
      this.bienesService.getBienPorCodigo(this.codigo).subscribe(
        (data: Bien[]) => {
          // Asigna el array de bienes directamente a la propiedad bienes
          this.bienes = data;
          console.log('Bienes recibidos:', this.bienes);
        },
        error => {
          // Maneja cualquier error ocurrido al obtener los datos del bien
          console.error('Error al obtener el bien:', error);
        }
      );
    }
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.bienes.length > 0) {
      const bienToUpdate = this.bienes[0]; // Seleccionamos el primer bien (si hay varios, puedes cambiar esto según tu lógica)

      this.bienesService.updateBien(bienToUpdate).subscribe(
        (        response: any) => {
          // Maneja la respuesta exitosa del servidor
          console.log('Bien actualizado con éxito:', response);
          alert('Bien actualizado con éxito');
        },
        (        error: any) => {
          // Maneja cualquier error ocurrido durante la actualización
          console.error('Error al actualizar el bien:', error);
          alert('Error al actualizar el bien');
        }
      );
    }
  }
}
